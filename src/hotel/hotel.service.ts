import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from '../database/database.service';
import * as argon from 'argon2';
import { HelpersService } from '../helpers/helpers.service';
import { LoginHotelDto, RegisterHotelDto, UpdateHotelDto } from './dto';
import { checkOldPasswordDto, ResetPasswordDto } from '../auth/dto';
@Injectable()
export class HotelService {
  constructor(
    private prisma: PrismaService,
    private resHandler: HelpersService.ResponseHandler,
  ) {}

  /**
   * Register Hotel Function
   * @param dto class containing registration details
   * @param res Express Response object
   * @returns ResponseHandler
   */
  async registerHotel(dto: RegisterHotelDto, res: Response) {
    try {
      // check if hotel exists
      const hotel = await this.prisma.hotel.findUnique({
        where: { email: dto.email },
      });
      if (!hotel) {
        const password = await argon.hash(dto.password);
        await this.prisma.hotel.create({
          data: { ...dto, password },
        });
        return this.resHandler.requestSuccessful({
          res,
          message: 'Hotel registered successfully',
        });
      } else {
        return this.resHandler.clientError(res, 'Hotel already registered');
      }
    } catch (err) {
      return this.resHandler.serverError(res, 'Error registering hotel');
    }
  }

  /**
   *
   * @param dto class containing login details
   * @param req Express Request Object
   * @param res Express Response Object
   * @returns ResponseHandler
   */
  async loginHotel(dto: LoginHotelDto, req: Request, res: Response) {
    try {
      const hotel = await this.prisma.hotel.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (!hotel) {
        return this.resHandler.clientError(res, 'Hotel does not exist', 400);
      }
      const passwordMatches = await argon.verify(hotel.password, dto.password);
      if (!passwordMatches) {
        return this.resHandler.clientError(res, 'Incorrect password', 400);
      } else {
        // save hotel session
        req.session.hotelId = hotel.id;
        return this.resHandler.requestSuccessful({
          res,
          message: 'Login successful',
          status: 200,
        });
      }
    } catch (err) {
      return this.resHandler.serverError(res, 'Error logging in');
    }
  }

  /**
   * Get Hotel function
   * @param hotelId Hotel's Id
   * @param res Express Response Object
   * @returns ResponseHandler
   */
  async getHotel(hotelId: string, res: Response) {
    try {
      const hotel = await this.prisma.hotel.findUnique({
        where: { id: hotelId },
      });
      if (!hotel) {
        return this.resHandler.clientError(res, 'Hotel account does not exist');
      } else {
        delete hotel.createdAt;
        delete hotel.password;
        return this.resHandler.requestSuccessful({
          res,
          payload: { ...hotel },
          message: 'Hotel details retrieved successfully',
        });
      }
    } catch (err) {
      return this.resHandler.serverError(res, 'Error getting hotel details');
    }
  }

  /**
   * Get Hotel by Id function
   * @param id Hotel id
   * @param res Express Response Object
   * @returns ResponseHandler
   */
  async getHotelById(id: string, res: Response) {
    try {
      const hotel = await this.prisma.hotel.findUnique({ where: { id } });
      delete hotel.password;
      delete hotel.createdAt;
      if (!hotel) {
        return this.resHandler.clientError(res, 'Hotel account does not exist');
      }

      return this.resHandler.requestSuccessful({
        res,
        payload: { ...hotel },
        message: 'Hotel retrieved successfully',
      });
    } catch (err) {
      console.log(err);
      return this.resHandler.serverError(res, 'Error retrieving hotel details');
    }
  }

  /**
   * Get All Hotel Rooms function
   * @param hotelId Hotel Id
   * @param res Express Response Object
   * @returns ResponseHandler
   */

  async getAllHotelRooms(hotelId: string, res: Response) {
    try {
      const hotel = await this.prisma.hotel.findUnique({
        where: { id: hotelId },
      });
      if (!hotel) {
        return this.resHandler.clientError(res, 'Hotel does not exist');
      } else {
        const rooms = await this.prisma.room.findMany({ where: { hotelId } });
        if (!rooms) {
          return this.resHandler.clientError(
            res,
            'You do not have any rooms yet.',
          );
        } else {
          return this.resHandler.requestSuccessful({
            res,
            payload: { rooms },
            message: 'Rooms retrieved successfully',
          });
        }
      }
    } catch (err) {
      return this.resHandler.serverError(res, 'Error retrieving hotel rooms');
    }
  }

  /**
   * Get All Hotel Bookings function
   * @param hotelId Hotel Id
   * @param res Express Response Object
   * @returns ResponseHandler
   */

  async getAllHotelBookings(hotelId: string, res: Response) {
    try {
      const hotel = await this.prisma.hotel.findUnique({
        where: { id: hotelId },
      });
      if (!hotel) {
        return this.resHandler.clientError(res, 'Hotel does not exist');
      } else {
        const bookings = await this.prisma.booking.findMany({
          where: { hotelId },
          select: {
            checkInDate: true,
            checkOutDate: true,
            id: true,
            numberOfRooms: true,
            cost: true,
            roomId: true,
          },
        });
        if (bookings.length < 1) {
          return this.resHandler.clientError(
            res,
            'You do not have any bookings yet.',
          );
        } else {
          return this.resHandler.requestSuccessful({
            res,
            payload: { bookings },
            message: 'Bookings retrieved successfully',
          });
        }
      }
    } catch (err) {
      return this.resHandler.serverError(
        res,
        'Error retrieving hotel bookings',
      );
    }
  }

  /**
   * Get All Hotels functions
   * @param res Express Response Object
   * @returns ResponseHandler
   */
  async getAllHotels(res: Response) {
    try {
      const hotels = await this.prisma.hotel.findMany({
        select: {
          id: true,
          name: true,
          address: true,
          phone: true,
          email: true,
          stars: true,
        },
      });
      return this.resHandler.requestSuccessful({ res, payload: { hotels } });
    } catch (err) {
      console.log(err);
      return this.resHandler.serverError(res, 'Error getting all hotels');
    }
  }
  /**
   * Update Hotel Details function
   * @param hotelId Hotel's id
   * @param dto class containing details to update
   * @param res Express Response Object
   * @returns ResponseHandler
   */
  async updateHotelDetails(
    hotelId: string,
    dto: UpdateHotelDto,
    res: Response,
  ) {
    try {
      const hotel = await this.prisma.hotel.findUnique({
        where: { id: hotelId },
      });
      if (!hotel) {
        return this.resHandler.clientError(res, 'Hotel does not exist');
      } else {
        await this.prisma.hotel.update({
          where: { id: hotelId },
          data: { ...dto },
        });
        return this.resHandler.requestSuccessful({
          res,
          message: 'Hotel details updated successfully',
        });
      }
    } catch (err) {
      console.log(err);
      return this.resHandler.serverError(res, 'Error updating hotel details');
    }
  }

  /**
   * Check Old Password Function
   * @param dto Class containing old password
   * @param hotelId Hotel's Id
   * @param res Express Response Object
   * @returns ResponseHandler
   */
  async checkOldPassword(
    dto: checkOldPasswordDto,
    hotelId: string,
    res: Response,
  ) {
    try {
      // takes current password
      const hotel = await this.prisma.hotel.findUnique({
        where: { id: hotelId },
      });
      const passwordMatches = await argon.verify(
        hotel.password,
        dto.currentPassword,
      );
      if (!passwordMatches) {
        return this.resHandler.clientError(res, 'Password does not match', 400);
      } else {
        return this.resHandler.requestSuccessful({
          res,
          message: 'Passwords match',
          status: 200,
        });
      }
    } catch (err) {
      return this.resHandler.serverError(res, 'Error checking old password');
    }
  }
  /**
   * Reset Password Function
   * @param dto Class containing new password
   * @param hotelId Hotel's Id
   * @param res Express Response Object
   * @returns ResponseHandler
   */
  async resetPassword(dto: ResetPasswordDto, hotelId: string, res: Response) {
    try {
      const hotel = await this.prisma.hotel.findUnique({
        where: { id: hotelId },
      });
      const newPasswordMatchesOld = await argon.verify(
        hotel.password,
        dto.newPassword,
      );
      if (newPasswordMatchesOld) {
        return this.resHandler.clientError(
          res,
          'New password must not be old password',
          400,
        );
      }
      const hashedNewPassword = await argon.hash(dto.newPassword);
      await this.prisma.hotel.update({
        where: { id: hotelId },
        data: {
          password: hashedNewPassword,
        },
      });
      return this.resHandler.requestSuccessful({
        res,
        message: 'Password changed successfully',
      });
    } catch (err) {
      console.log(err);
      return this.resHandler.serverError(res, 'Error updating password');
    }
  }
}
