import { IsNotEmpty, IsString } from 'class-validator';

export class checkOldPasswordDto {
  @IsString()
  @IsNotEmpty()
  currentPassword: string;
}
