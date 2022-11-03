import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsUrl, IsString } from 'class-validator';

export class UpdateRoomDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  price?: number;

  @IsOptional()
  @IsString()
  @IsUrl()
  image?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  numberAvailable?: number;
}
