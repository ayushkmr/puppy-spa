import { Controller, Get, Post, Body, Param, Delete, Put, Query, ParseUUIDPipe, ParseIntPipe } from '@nestjs/common';
import { WaitingListEntryService } from './waiting-list-entry.service';
import { CreateWaitingListEntryDto } from './dto/create-waiting-list-entry.dto';
import { WaitingListEntry } from './entities/waiting-list-entry.entity';

@Controller('waiting-lists/:waitingListId/entries')
export class WaitingListEntryController {
  constructor(private readonly waitingListEntryService: WaitingListEntryService) {}

  @Post()
  create(
    @Param('waitingListId', ParseUUIDPipe) waitingListId: string,
    @Body() createWaitingListEntryDto: CreateWaitingListEntryDto,
  ): Promise<WaitingListEntry> {
    return this.waitingListEntryService.create(waitingListId, createWaitingListEntryDto);
  }

  @Get()
  findAll(
    @Param('waitingListId', ParseUUIDPipe) waitingListId: string,
  ): Promise<WaitingListEntry[]> {
    return this.waitingListEntryService.findAll(waitingListId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<WaitingListEntry> {
    return this.waitingListEntryService.findOne(id);
  }

  @Put(':id/position')
  updatePosition(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('position', ParseIntPipe) position: number,
  ): Promise<WaitingListEntry> {
    return this.waitingListEntryService.updatePosition(id, position);
  }

  @Put(':id/service')
  markServiced(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('isServiced') isServiced: boolean,
  ): Promise<WaitingListEntry> {
    return this.waitingListEntryService.markServiced(id, isServiced);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.waitingListEntryService.remove(id);
  }
}

@Controller('entries/search')
export class WaitingListEntrySearchController {
  constructor(private readonly waitingListEntryService: WaitingListEntryService) {}

  @Get()
  search(@Query('q') query: string): Promise<WaitingListEntry[]> {
    return this.waitingListEntryService.search(query);
  }
} 