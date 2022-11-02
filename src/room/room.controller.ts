import {
  Controller,
  Post,
  Get,
  Body,
  Patch,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { RoomService } from './room.service';
import { GetHotel } from '../decorators';
import { HotelAuthGuard } from '../guards';
import { NewRoomDto } from './dto';
@Controller('hotels/rooms')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @UseGuards(HotelAuthGuard)
  @Post('/new')
  async newRoom(
    @GetHotel() hotelId: string,
    @Body() dto: NewRoomDto,
    @Res() res: Response,
  ) {
    return await this.roomService.newRoom(hotelId, dto, res);
  }
  @UseGuards(HotelAuthGuard)
  @Get('/mine')
  async getRoomsByHotel(@GetHotel() hotelId: string, @Res() res: Response) {
    return await this.roomService.getRoomsByHotel(hotelId, res);
  }
  //  get all rooms by single hotel (using logged in hotel ) GET
  //update room details //PATCH
  // get all rooms (public) GET
  // delete room (using logged in hotel ) DELETE
}
