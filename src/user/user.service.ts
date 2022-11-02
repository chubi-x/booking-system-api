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

  /**
   * Get User function
   * @param userId User's Id
   * @param res Express Response Object
   * @returns ResponseHandler
   */
  async getUser(userId: string, res: Response) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      delete user.createdAt;
      delete user.password;

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
    } catch (err) {
      return this.resHandler.serverError(res, 'Error getting user details');
    }
  }

  /**
   * Update User Bio function
   * @param userId User's Id
   * @param dto Class containing bio details to be updated
   * @param res Express Response Object
   * @returns ResponseHandler
   */
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
  /**
   * Update User Preferences function
   * @param userId User's Id
   * @param dto Class containing preferences to be updated
   * @param res Express Response Object
   * @returns Response Handler
   */
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
  /**
   * Update User Credit Card Info Function
   * @param userId User's Id
   * @param dto Class containing credit card details
   * @param res Express Response Object
   * @returns ResponseHandler
   */
  async updateUserCreditCardInfo(
    userId: string,
    dto: UpdateCreditCardDto,
    res: Response,
  ) {
    try {
      await this.prisma.creditCardDetails.update({
        where: { userId },
        data: { ...dto },
      });
      return this.resHandler.requestSuccessful({
        res,
        message: 'Credit card details updated successfully',
      });
    } catch (err) {
      return this.resHandler.serverError(
        res,
        'Error updating credit card info',
      );
    }
  }
  /**
   * Delete User function
   * @param userId User's Id
   * @param res Express Response Object
   * @returns ResponseHandler
   */
  async deleteUser(userId: string, res: Response) {
    try {
      // first delete preferences
      await this.prisma.preferences.delete({ where: { userId } });
      // then delete credit card
      await this.prisma.creditCardDetails.delete({ where: { userId } });
      // then delete user
      await this.prisma.user.delete({ where: { id: userId } });

      return this.resHandler.requestSuccessful({
        res,
        message: 'User deleted successfully',
      });
    } catch (err) {
      return this.resHandler.serverError(res, 'Error deleting user');
    }
  }
}
