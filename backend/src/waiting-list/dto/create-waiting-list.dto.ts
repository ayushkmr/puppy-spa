import { IsDateString, IsOptional } from 'class-validator';

export class CreateWaitingListDto {
  @IsOptional()
  @IsDateString()
  date?: string; // If not provided, today's date will be used
} 