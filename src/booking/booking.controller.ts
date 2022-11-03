import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  Res,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { Response } from 'express';
import { AuthGuard } from '../guards';
import { GetUser } from '../decorators';
import { CreateBookingDto } from './dto';
@UseGuards(AuthGuard)
@Controller('bookings')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post('/new')
  async createBooking(
    @GetUser() userId: string,
    @Body() dto: CreateBookingDto,
    @Res() res: Response,
  ) {
    return await this.bookingService.createBooking(userId, dto, res);
  }
  // update booking (PATCH)
  // get booking by id (GET)
  // Get all bookings by user (GET)
  // delete booking by Id (DELETE)
  //delete all bookings made by user (DELETE)
}
