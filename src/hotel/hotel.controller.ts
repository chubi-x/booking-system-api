import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { RegisterHotelDto } from './dto';
import { HotelService } from './hotel.service';
import { Request, Response } from 'express';
@Controller('hotels')
export class HotelController {
  constructor(private hotelService: HotelService) {}
  // create hotel
  @Post('/register')
  async registerHotel(
    @Body() dto: RegisterHotelDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return await this.hotelService.registerHotel(dto, req, res);
  }
  // get hotel by id
  // get all hotels
  // update hotel details (name,address,phone,email)
  // reset password

  // create hotel room
  // update hotel room
  //  get all rooms by single hotel
  // get all rooms (public)
  // delete room
}
