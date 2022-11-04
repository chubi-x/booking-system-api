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
import { CreateBookingDto, UpdateBookingDto } from './dto';
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
  @Patch('/update/:bookingId')
  async updateBookingById(
    @Param('bookingId') bookingId: string,
    @GetUser() userId: string,
    @Body() dto: UpdateBookingDto,
    @Res() res: Response,
  ) {
    return await this.bookingService.updateBookingById(
      bookingId,
      userId,
      dto,
      res,
    );
  }
  @Get('/:id')
  async getBookingById(@Param('id') id: string, @Res() res: Response) {
    return this.bookingService.getBookingById(id, res);
  }
  // Get all bookings by user (GET)
  // delete booking by Id (DELETE)
  //delete all bookings made by user (DELETE)
}
