import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WaitingList } from './entities/waiting-list.entity';
import { CreateWaitingListDto } from './dto/create-waiting-list.dto';

@Injectable()
export class WaitingListService {
  constructor(
    @InjectRepository(WaitingList)
    private waitingListRepository: Repository<WaitingList>,
  ) {}

  async create(createWaitingListDto: CreateWaitingListDto): Promise<WaitingList> {
    const { date } = createWaitingListDto;
    
    // Use provided date or today's date
    const waitingListDate = date ? new Date(date) : new Date();
    
    // Normalize date to remove time component
    waitingListDate.setHours(0, 0, 0, 0);
    
    // Check if a list already exists for this date
    const existingList = await this.waitingListRepository.findOne({
      where: { date: waitingListDate },
    });
    
    if (existingList) {
      return existingList;
    }
    
    // Create new waiting list
    const waitingList = this.waitingListRepository.create({
      date: waitingListDate,
    });
    
    return this.waitingListRepository.save(waitingList);
  }

  async findAll(): Promise<WaitingList[]> {
    return this.waitingListRepository.find({
      order: { date: 'DESC' },
    });
  }

  async findOne(id: string): Promise<WaitingList> {
    const waitingList = await this.waitingListRepository.findOne({
      where: { id },
      relations: ['entries'],
    });
    
    if (!waitingList) {
      throw new NotFoundException(`Waiting list with ID "${id}" not found`);
    }
    
    return waitingList;
  }

  async findByDate(date: Date): Promise<WaitingList> {
    // Normalize date to remove time component
    date.setHours(0, 0, 0, 0);
    
    const waitingList = await this.waitingListRepository.findOne({
      where: { date },
      relations: ['entries'],
    });
    
    if (!waitingList) {
      throw new NotFoundException(`Waiting list for date "${date.toISOString().split('T')[0]}" not found`);
    }
    
    return waitingList;
  }

  async findToday(): Promise<WaitingList> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let waitingList = await this.waitingListRepository.findOne({
      where: { date: today },
      relations: ['entries'],
    });
    
    // If no list exists for today, create one
    if (!waitingList) {
      waitingList = await this.create({ date: today.toISOString() });
      
      // Fetch again with relations
      const refreshedList = await this.waitingListRepository.findOne({
        where: { id: waitingList.id },
        relations: ['entries'],
      });
      
      // This should never happen, but just to be safe
      if (!refreshedList) {
        throw new NotFoundException(`Could not retrieve created waiting list for today`);
      }
      
      return refreshedList;
    }
    
    return waitingList;
  }
} 