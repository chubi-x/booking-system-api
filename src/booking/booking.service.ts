import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from '../database/database.service';
import { HelpersService } from '../helpers/helpers.service';
import { CreateBookingDto } from './dto';

@Injectable()
export class BookingService {
  constructor(
    private prisma: PrismaService,
    private resHandler: HelpersService.ResponseHandler,
  ) {}

  /**
   * Create Booking Function
   * @param userId User's Id
   * @param dto Class containing booking details
   * @param res Express Response Object
   * @returns ResHandler
   */
  async createBooking(userId: string, dto: CreateBookingDto, res: Response) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      const room = await this.prisma.room.findUnique({
        where: { id: dto.roomId },
      });
      if (user && room) {
        if (dto.numberOfRooms < room.numberAvailable) {
          // create booking
          await this.prisma.booking.create({
            data: {
              ...dto,
              cost: dto.numberOfRooms * room.price,
              userId: user.id,
              roomId: room.id,
              hotelId: room.hotelId,
            },
          });
          // update available room number
          await this.prisma.room.update({
            where: { id: room.id },
            data: { numberAvailable: room.numberAvailable - dto.numberOfRooms },
          });
          //   return response
          return this.resHandler.requestSuccessful({
            res,
            message: 'Booking created successfully',
          });
        } else {
          return this.resHandler.clientError(
            res,
            'The number of available rooms is less than your desired booking',
          );
        }
      } else {
        return this.resHandler.clientError(res, 'User or room does not exist.');
      }
    } catch (err) {
      console.log(err);
      return this.resHandler.serverError(res, 'Error creating booking');
    }
  }
}
