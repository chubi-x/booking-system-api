import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from '../database/database.service';
import { HelpersService } from '../helpers/helpers.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private resHandler: HelpersService.ResponseHandler,
  ) {}

  async getUser(req: Request, res: Response) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: req.session.userId,
      },
    });
    return this.resHandler.requestSuccessful({ res, payload: { ...user } });
  }
}
