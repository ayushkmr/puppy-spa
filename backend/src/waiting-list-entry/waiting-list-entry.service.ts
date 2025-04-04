import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WaitingListEntry } from './entities/waiting-list-entry.entity';
import { CreateWaitingListEntryDto } from './dto/create-waiting-list-entry.dto';
import { WaitingListService } from '../waiting-list/waiting-list.service';

@Injectable()
export class WaitingListEntryService {
  constructor(
    @InjectRepository(WaitingListEntry)
    private waitingListEntryRepository: Repository<WaitingListEntry>,
    private waitingListService: WaitingListService,
  ) {}

  async create(
    waitingListId: string,
    createWaitingListEntryDto: CreateWaitingListEntryDto,
  ): Promise<WaitingListEntry> {
    // Check if waiting list exists
    const waitingList = await this.waitingListService.findOne(waitingListId);
    
    // Calculate position (get max position and add 1)
    const entries = await this.waitingListEntryRepository.find({
      where: { waitingListId },
      order: { position: 'DESC' },
      take: 1,
    });
    
    const position = entries.length > 0 ? entries[0].position + 1 : 1;
    
    // Create entry
    const waitingListEntry = this.waitingListEntryRepository.create({
      ...createWaitingListEntryDto,
      waitingListId,
      position,
      arrivalTime: createWaitingListEntryDto.arrivalTime 
        ? new Date(createWaitingListEntryDto.arrivalTime) 
        : new Date(),
      isServiced: false,
      servicedTime: null,
    });
    
    return this.waitingListEntryRepository.save(waitingListEntry);
  }

  async findAll(waitingListId: string): Promise<WaitingListEntry[]> {
    return this.waitingListEntryRepository.find({
      where: { waitingListId },
      order: { position: 'ASC' },
    });
  }

  async findOne(id: string): Promise<WaitingListEntry> {
    const entry = await this.waitingListEntryRepository.findOne({
      where: { id },
    });
    
    if (!entry) {
      throw new NotFoundException(`Waiting list entry with ID "${id}" not found`);
    }
    
    return entry;
  }

  async updatePosition(id: string, newPosition: number): Promise<WaitingListEntry> {
    const entry = await this.findOne(id);
    
    if (newPosition < 1) {
      throw new BadRequestException('Position must be at least 1');
    }
    
    // Get all entries for the same waiting list
    const entries = await this.findAll(entry.waitingListId);
    
    // If moving down (higher position number)
    if (newPosition > entry.position) {
      // Update positions of entries between old and new position
      for (const otherEntry of entries) {
        if (
          otherEntry.id !== id &&
          otherEntry.position > entry.position &&
          otherEntry.position <= newPosition
        ) {
          otherEntry.position -= 1;
          await this.waitingListEntryRepository.save(otherEntry);
        }
      }
    } 
    // If moving up (lower position number)
    else if (newPosition < entry.position) {
      // Update positions of entries between new and old position
      for (const otherEntry of entries) {
        if (
          otherEntry.id !== id &&
          otherEntry.position >= newPosition &&
          otherEntry.position < entry.position
        ) {
          otherEntry.position += 1;
          await this.waitingListEntryRepository.save(otherEntry);
        }
      }
    } else {
      // No change in position
      return entry;
    }
    
    // Update the entry's position
    entry.position = newPosition;
    return this.waitingListEntryRepository.save(entry);
  }

  async markServiced(id: string, isServiced: boolean): Promise<WaitingListEntry> {
    const entry = await this.findOne(id);
    
    entry.isServiced = isServiced;
    entry.servicedTime = isServiced ? new Date() : null;
    
    return this.waitingListEntryRepository.save(entry);
  }

  async remove(id: string): Promise<void> {
    const entry = await this.findOne(id);
    
    // Delete the entry
    await this.waitingListEntryRepository.remove(entry);
    
    // Reorder positions for remaining entries
    const entries = await this.findAll(entry.waitingListId);
    for (let i = 0; i < entries.length; i++) {
      entries[i].position = i + 1;
      await this.waitingListEntryRepository.save(entries[i]);
    }
  }

  async search(query: string): Promise<WaitingListEntry[]> {
    // Search for entries matching the query in owner name or puppy name
    return this.waitingListEntryRepository
      .createQueryBuilder('entry')
      .leftJoinAndSelect('entry.waitingList', 'waitingList')
      .where('LOWER(entry.ownerName) LIKE LOWER(:query)', { query: `%${query}%` })
      .orWhere('LOWER(entry.puppyName) LIKE LOWER(:query)', { query: `%${query}%` })
      .orderBy('waitingList.date', 'DESC')
      .addOrderBy('entry.position', 'ASC')
      .getMany();
  }
} 