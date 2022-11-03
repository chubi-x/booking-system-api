import {
  Controller,
  Post,
  Get,
  Body,
  Patch,
  Res,
  UseGuards,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { RoomService } from './room.service';
import { GetHotel } from '../decorators';
import { HotelAuthGuard } from '../guards';
import { NewRoomDto, UpdateRoomDto } from './dto';
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
  @Get('/:id')
  async getRoomById(@Param('id') id: string, @Res() res: Response) {
    return await this.roomService.getRoomById(id, res);
  }

  @UseGuards(HotelAuthGuard)
  @Patch('/update/:id')
  async updateRoomById(
    @Body() dto: UpdateRoomDto,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    return await this.roomService.updateRoomById(dto, id, res);
  }
  // delete room (using logged in hotel ) DELETE
}
