import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from '../database/database.service';
import { HelpersService } from '../helpers/helpers.service';
import { CreateBookingDto, UpdateBookingDto } from './dto';

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

  /**
   * Update Booking Function
   * @param bookingId: Booking id
   * @param userId User's Id
   * @param dto Class containing booking details to be updated
   * @param res Express Response Object
   * @returns ResHandler
   */
  async updateBookingById(
    bookingId: string,
    userId: string,
    dto: UpdateBookingDto,
    res: Response,
  ) {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: { id: bookingId },
      });
      const room = await this.prisma.room.findUnique({
        where: { id: dto.roomId },
      });
      // if user is changing number of rooms check if its less than existing number of rooms in the booking.
      // If it is, update room with the difference. if its not update subtract difference from number of available rooms

      if (booking) {
        if (dto.numberOfRooms && dto.numberOfRooms <= booking.numberOfRooms) {
          await this.prisma.room.update({
            where: { id: room.id },
            data: {
              numberAvailable:
                room.numberAvailable +
                booking.numberOfRooms -
                dto.numberOfRooms,
            },
          });
        } else if (
          dto.numberOfRooms &&
          dto.numberOfRooms > booking.numberOfRooms &&
          dto.numberOfRooms <= room.numberAvailable
        ) {
          await this.prisma.room.update({
            where: { id: room.id },
            data: {
              numberAvailable:
                room.numberAvailable -
                dto.numberOfRooms +
                booking.numberOfRooms,
            },
          });
        } else if (dto.numberOfRooms > room.numberAvailable) {
          return this.resHandler.clientError(
            res,
            'The number of available rooms is less than your desired booking',
          );
        }

        await this.prisma.booking.update({
          where: { id: bookingId },
          data: {
            ...dto,
          },
        });
        return this.resHandler.requestSuccessful({
          res,
          message: 'Booking updated successfully',
        });
      } else {
        return this.resHandler.clientError(res, 'Booking does not exist');
      }
    } catch (err) {
      console.log(err);
      return this.resHandler.serverError(res, 'Error updating booking details');
    }
  }

  /**
   * Get Booking by Id function
   * @param id Booking Id
   * @param res Express Response Object
   * @returns ResponseHandler
   */
  async getBookingById(id: string, res: Response) {
    try {
      const booking = await this.prisma.booking.findUnique({ where: { id } });
      if (booking) {
        delete booking.createdAt;
        delete booking.updatedAt;
        delete booking.userId;
        return this.resHandler.requestSuccessful({
          res,
          payload: { ...booking },
          message: 'Booking retrieved successfully',
        });
      } else {
        return this.resHandler.clientError(res, 'Booking does not exist');
      }
    } catch (err) {
      return this.resHandler.serverError(res, 'Error retrieving booking');
    }
  }
  /**
   * Get all Bookings by User Function
   * @param userId User Id
   * @param {Express.Response} res Response Object
   * @returns ResponseHandler
   */
  async getAllBookingsByUser(userId: string, res: Response) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (user) {
        const bookings = await this.prisma.booking.findMany({
          where: { userId },
        });
        if (bookings) {
          bookings.forEach((booking) => {
            delete booking.hotelId;
            delete booking.roomId;
            delete booking.createdAt;
            delete booking.updatedAt;
            delete booking.userId;
          });

          return this.resHandler.requestSuccessful({
            res,
            payload: bookings,
            message: 'Bookings retrieved successfully',
          });
        } else {
          return this.resHandler.clientError(
            res,
            "You don't have any bookings",
          );
        }
      } else {
        return this.resHandler.clientError(res, 'User does not exist');
      }
    } catch (err) {
      return this.resHandler.serverError(
        res,
        'There was an error getting your bookings',
      );
    }
  }

  /**
   *
   * @param id Booking Id
   * @param {Express.Response} res Response Object
   * @returns ResponseHandler

   */
  async deleteBookingById(id: string, res: Response) {
    try {
      const booking = await this.prisma.booking.findUnique({ where: { id } });
      if (booking) {
        await this.prisma.booking.delete({ where: { id } });
        return this.resHandler.requestSuccessful({
          res,
          message: 'Booking deleted successfully',
        });
      } else {
        return this.resHandler.clientError(res, 'Booking does not exist');
      }
    } catch (err) {
      return this.resHandler.serverError(
        res,
        'There was an error deleting this booking',
      );
    }
  }

  /**
   * Delete All Bookings Function
   * @param userId: user's Id
   * @param res Express Response Object
   */
  async deleteAllBookings(userId: string, res: Response) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        return this.resHandler.clientError(res, 'User does not exist');
      } else {
        const bookings = await this.prisma.booking.findMany({
          where: { userId },
        });
        if (!bookings) {
          return this.resHandler.clientError(
            res,
            "You don't have any bookings",
          );
        } else {
          await this.prisma.booking.deleteMany({ where: { userId } });
          return this.resHandler.requestSuccessful({
            res,
            message: 'Bookings deleted successfully',
          });
        }
      }
    } catch (err) {
      return this.resHandler.serverError(res, 'Error deleting all bookings');
    }
  }
}
