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

  // create hotel room (using logged in hotel )
  @UseGuards(HotelAuthGuard)
  @Post('/new')
  async newRoom(
    @GetHotel() hotelId: string,
    @Body() dto: NewRoomDto,
    @Res() res: Response,
  ) {
    return this.roomService.newRoom(hotelId, dto, res);
  }
  //update room details //PATCH
  //  get all rooms by single hotel (using logged in hotel ) GET
  // get all rooms (public) GET
  // delete room (using logged in hotel ) DELETE
}
