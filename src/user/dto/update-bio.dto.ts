import {
  IsString,
  IsOptional,
  IsUrl,
  IsDate,
  IsPhoneNumber,
} from 'class-validator';
export class UpdateBioDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  profilePicture?: string;

  @IsDate()
  @IsOptional()
  dateOfBirth?: Date;

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: number;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  nationality?: string;
}
