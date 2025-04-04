import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { WaitingListService } from './waiting-list.service';
import { CreateWaitingListDto } from './dto/create-waiting-list.dto';
import { WaitingList } from './entities/waiting-list.entity';

@Controller('waiting-lists')
export class WaitingListController {
  constructor(private readonly waitingListService: WaitingListService) {}

  @Post()
  create(@Body() createWaitingListDto: CreateWaitingListDto): Promise<WaitingList> {
    return this.waitingListService.create(createWaitingListDto);
  }

  @Get()
  findAll(): Promise<WaitingList[]> {
    return this.waitingListService.findAll();
  }

  @Get('today')
  findToday(): Promise<WaitingList> {
    return this.waitingListService.findToday();
  }

  @Get(':date')
  findByDate(@Param('date') dateString: string): Promise<WaitingList> {
    const date = new Date(dateString);
    return this.waitingListService.findByDate(date);
  }
} 