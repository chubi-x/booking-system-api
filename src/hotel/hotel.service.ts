import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from '../database/database.service';
import * as argon from 'argon2';
import { HelpersService } from '../helpers/helpers.service';
import { LoginHotelDto, RegisterHotelDto } from './dto';
@Injectable()
export class HotelService {
  constructor(
    private prisma: PrismaService,
    private resHandler: HelpersService.ResponseHandler,
  ) {}

  async registerHotel(dto: RegisterHotelDto, res: Response) {
    try {
      // check if hotel exists
      const hotel = await this.prisma.hotel.findUnique({
        where: { email: dto.email },
      });
      if (!hotel) {
        const password = await argon.hash(dto.password);
        const hotel = await this.prisma.hotel.create({
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
        // save user session
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

  async getHotel(hotelId: string, res: Response) {
    try {
      const hotel = await this.prisma.hotel.findUnique({
        where: { id: hotelId },
      });
      delete hotel.createdAt;
      delete hotel.password;

      return this.resHandler.requestSuccessful({
        res,
        payload: { ...hotel },
        message: 'Hotel details retrieved successfully',
      });
    } catch (err) {
      return this.resHandler.serverError(res, 'Error getting hotel details');
    }
  }
  async getHotelById(id: string, res: Response) {
    try {
      const hotel = await this.prisma.hotel.findUnique({ where: { id } });
      delete hotel.password;
      delete hotel.createdAt;

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
}
