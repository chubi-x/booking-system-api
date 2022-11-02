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
   * New Room Function
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
  /**
   * Get Rooms By Hotel Function
   * @param hotelId Hotel's Id
   * @param res Express Response Object
   * @returns ResponseHandler
   */
  async getRoomsByHotel(hotelId: string, res: Response) {
    try {
      const rooms = await this.prisma.room.findMany({ where: { hotelId } });
      return this.resHandler.requestSuccessful({
        res,
        payload: { ...rooms },
        message: 'Rooms retrieved successfully',
      });
    } catch (err) {
      return this.resHandler.serverError(res, 'Error getting rooms');
    }
  }
}