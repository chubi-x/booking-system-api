import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginHotelDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
