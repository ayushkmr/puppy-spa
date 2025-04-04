import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateWaitingListEntryDto {
  @IsString()
  @IsNotEmpty()
  ownerName: string;

  @IsString()
  @IsNotEmpty()
  puppyName: string;

  @IsString()
  @IsNotEmpty()
  breed: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsOptional()
  arrivalTime?: Date;
} 