import { Type } from 'class-transformer';
import {
  IsNumber,
  Max,
  Min,
  IsCreditCard,
  IsString,
  IsDate,
  IsNotEmpty,
} from 'class-validator';

export class UpdateCreditCardDto {
  @IsString()
  @IsCreditCard()
  @IsNotEmpty()
  number: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(100, { message: 'Cvv must not be less than 3 digits' })
  @Max(999, { message: 'Cvv must not be more than 4 digits' })
  @Type(() => Number)
  cvv: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  expiryDate: Date; //TODO: update to only month and year
}
