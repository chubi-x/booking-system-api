import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateEmailDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
