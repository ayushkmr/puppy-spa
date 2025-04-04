import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaitingListEntry } from './entities/waiting-list-entry.entity';
import { WaitingListEntryService } from './waiting-list-entry.service';
import { WaitingListEntryController, WaitingListEntrySearchController } from './waiting-list-entry.controller';
import { WaitingListModule } from '../waiting-list/waiting-list.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WaitingListEntry]),
    WaitingListModule,
  ],
  controllers: [WaitingListEntryController, WaitingListEntrySearchController],
  providers: [WaitingListEntryService],
  exports: [WaitingListEntryService],
})
export class WaitingListEntryModule {} 