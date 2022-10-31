import { IsString, IsEmail } from 'class-validator';

export class SignupDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsEmail()
  @IsString()
  email: string;
  @IsString()
  password: string;
}
