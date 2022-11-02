import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';

enum RoomKind {
  STANDARD = 'STANDARD',
  DELUXE = 'DELUXE',
  EXECUTIVE = 'EXECUTIVE',
  PRESIDENTIAL = 'PRESIDENTIAL',
}
export class NewRoomDto {
  @IsNotEmpty()
  @IsEnum(RoomKind)
  kind: RoomKind;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  numberAvailable: number;
}
