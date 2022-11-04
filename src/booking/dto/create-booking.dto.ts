import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsString,
  IsUUID,
} from 'class-validator';
export class CreateBookingDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  checkInDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  checkOutDate: Date;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  numberOfRooms: number;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  roomId: string;
}
