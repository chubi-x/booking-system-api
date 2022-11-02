import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from '../database/database.service';
import { HelpersService } from '../helpers/helpers.service';
import { NewRoomDto } from './dto';

@Injectable()
export class RoomService {
  constructor(
    private prisma: PrismaService,
    private resHandler: HelpersService.ResponseHandler,
  ) {}

  /**
   *
   * @param hotelId Hotel's Id
   * @param dto class containing new room details
   * @param res Express Response Object
   * @returns ResponseHandler
   */
  async newRoom(hotelId: string, dto: NewRoomDto, res: Response) {
    try {
      await this.prisma.room.create({
        data: {
          hotelId,
          ...dto,
        },
      });
      return this.resHandler.requestSuccessful({
        res,
        message: 'Room added successfully',
      });
    } catch (err) {
      return this.resHandler.serverError(res, 'Error creating new room');
    }
  }
}
