import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from '../database/database.service';
import { HelpersService } from '../helpers/helpers.service';
import { UpdateBioDto, UpdateCreditCardDto, UpdatePreferencesDto } from './dto';

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
    const preferences = await this.prisma.preferences.findUnique({
      where: { userId },
    });
    delete preferences.id;
    delete preferences.userId;

    const creditCardDetails = await this.prisma.creditCardDetails.findUnique({
      where: { userId },
    });
    delete creditCardDetails.id;
    delete creditCardDetails.userId;
    const payload = {
      user: { ...user, preferences, creditCardDetails },
    };
    return this.resHandler.requestSuccessful({ res, payload });
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
