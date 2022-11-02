import {
  Body,
  Get,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  Param,
  Patch,
} from '@nestjs/common';
import { LoginHotelDto, RegisterHotelDto, UpdateHotelDto } from './dto';
import { HotelService } from './hotel.service';
import { Request, Response } from 'express';
import { GetHotel } from '../decorators';
import { HotelAuthGuard } from '../guards';
@Controller('hotels')
export class HotelController {
  constructor(private hotelService: HotelService) {}

  @UseGuards(HotelAuthGuard)
  @Get('/mine')
  async getHotel(@GetHotel() hotelId: string, @Res() res: Response) {
    return await this.hotelService.getHotel(hotelId, res);
  }

  @Get('/all')
  async getAllHotels(@Res() res: Response) {
    return await this.hotelService.getAllHotels(res);
  }

  @Get('/:id')
  async getHotelById(@Param('id') id: string, @Res() res: Response) {
    return this.hotelService.getHotelById(id, res);
  }

  @Post('/register')
  async registerHotel(
    @Body() dto: RegisterHotelDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return await this.hotelService.registerHotel(dto, res);
  }

  @Post('/login')
  async loginHotel(
    @Body() dto: LoginHotelDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.hotelService.loginHotel(dto, req, res);
  }

  @UseGuards(HotelAuthGuard)
  @Patch('/mine/update')
  async updateHotelDetails(
    @GetHotel() hotelId: string,
    @Body() dto: UpdateHotelDto,
    @Res() res: Response,
  ) {
    return await this.hotelService.updateHotelDetails(hotelId, dto, res);
  }
  // reset password

  // create hotel room
  // update hotel room
  //  get all rooms by single hotel
  // get all rooms (public)
  // delete room
}
