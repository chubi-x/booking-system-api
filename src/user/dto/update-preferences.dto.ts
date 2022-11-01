import { IsOptional, IsString } from 'class-validator';
export class UpdatePreferencesDto {
  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  language?: string;
}
