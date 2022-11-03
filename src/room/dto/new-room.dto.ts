import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsEnum, IsUrl, IsString } from 'class-validator';

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

  @IsString()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  numberAvailable: number;
}
