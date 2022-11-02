import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from '../database/database.service';
import * as argon from 'argon2';
import { HelpersService } from '../helpers/helpers.service';
import { RegisterHotelDto } from './dto';
@Injectable()
export class HotelService {
  constructor(
    private prisma: PrismaService,
    private resHandler: HelpersService.ResponseHandler,
  ) {}

  async registerHotel(dto: RegisterHotelDto, req: Request, res: Response) {
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
        req.session.hotelId = hotel.id;
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
}
