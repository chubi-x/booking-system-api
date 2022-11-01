import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from '../database/database.service';
import { HelpersService } from '../helpers/helpers.service';
import { UpdateBioDto, UpdatePreferencesDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private resHandler: HelpersService.ResponseHandler,
  ) {}

  async getUser(userId: string, res: Response) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return this.resHandler.requestSuccessful({ res, payload: { ...user } });
  }
  async updateUserBio(userId: string, dto: UpdateBioDto, res: Response) {
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: { ...dto },
      });
      return this.resHandler.requestSuccessful({
        res,
        message: 'User details updated successfully',
      });
    } catch (err) {
      return this.resHandler.serverError(res, 'Error updating user details');
    }
  }
  async updateUserPreferences(
    userId: string,
    dto: UpdatePreferencesDto,
    res: Response,
  ) {
    try {
      await this.prisma.preferences.update({
        where: { userId },
        data: { ...dto },
      });
      return this.resHandler.requestSuccessful({
        res,
        message: 'Preferences updated successfully',
      });
    } catch (err) {
      console.log(err);
      return this.resHandler.serverError(
        res,
        'Error updating user preferences',
      );
    }
  }
}
