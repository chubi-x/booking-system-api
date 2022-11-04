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

  @Get('/booking/:id')
  async getBookingById(@Param('id') id: string, @Res() res: Response) {
    return this.bookingService.getBookingById(id, res);
  }
  @Get('')
  async getAllBookingsByUser(@GetUser() userId: string, @Res() res: Response) {
    return this.bookingService.getAllBookingsByUser(userId, res);
  }
  @Post('/new')
  async createBooking(
    @GetUser() userId: string,
    @Body() dto: CreateBookingDto,
    @Res() res: Response,
  ) {
    return await this.bookingService.createBooking(userId, dto, res);
  }
  // update booking (PATCH)
  @Patch('/booking/update/:bookingId')
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
  @Delete('/booking/delete/:id')
  async deleteBookingById(@Param('id') id: string, @Res() res: Response) {
    return await this.bookingService.deleteBookingById(id, res);
  }
  @Delete('/delete/all')
  async deleteAllBookings(@GetUser() userId: string, @Res() res: Response) {
    return await this.bookingService.deleteAllBookings(userId, res);
  }

  //delete all bookings made by user (DELETE)
}
