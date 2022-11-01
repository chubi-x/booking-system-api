import {
  IsString,
  IsOptional,
  IsUrl,
  IsDate,
  IsPhoneNumber,
  IsEnum,
} from 'class-validator';

enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
}

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
  phoneNumber?: string;

  @IsEnum(Gender, { message: 'Gender must be MALE or FEMALE' })
  @IsOptional()
  gender?: Gender;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  nationality?: string;
}
