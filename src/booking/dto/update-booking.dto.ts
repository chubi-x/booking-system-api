import { Type } from 'class-transformer';
import {
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
export class UpdateBookingDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  checkInDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  checkOutDate: Date;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  numberOfRooms: number;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  roomId: string;
}
