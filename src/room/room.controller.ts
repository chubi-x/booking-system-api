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

  @Get('/all')
  async getAllRooms(@Res() res: Response) {
    return await this.roomService.getAllRooms(res);
  }

  //update room details //PATCH
  // delete room (using logged in hotel ) DELETE
}
