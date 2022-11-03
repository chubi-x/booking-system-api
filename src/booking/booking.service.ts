import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/database.service';
import { HelpersService } from '../helpers/helpers.service';

@Injectable()
export class BookingService {
  constructor(
    private prisma: PrismaService,
    private resHandler: HelpersService.ResponseHandler,
  ) {}
}
