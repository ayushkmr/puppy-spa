import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaitingList } from './entities/waiting-list.entity';
import { WaitingListController } from './waiting-list.controller';
import { WaitingListService } from './waiting-list.service';

@Module({
  imports: [TypeOrmModule.forFeature([WaitingList])],
  controllers: [WaitingListController],
  providers: [WaitingListService],
  exports: [WaitingListService],
})
export class WaitingListModule {} 