import * as argon from 'argon2';
import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from '../database/database.service';
import { HelpersService } from '../helpers/helpers.service';
import {
  checkOldPasswordDto,
  LoginDto,
  ResetPasswordDto,
  SignupDto,
  UpdateEmailDto,
} from './dto';
@Injectable()
/**
 * Authentication Service
 */
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private resHandler: HelpersService.ResponseHandler,
  ) {}

  /**
   * User Sign Up function
   * @param dto Class containing Signup details
   * @param res Express Response object
   * @returns ResponseHandler
   */
  async signup(dto: SignupDto, res: Response) {
    const password = await argon.hash(dto.password);
    // first check if user exists

    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (!user) {
        // create user
        const user = await this.prisma.user.create({
          data: {
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            password,
          },
        });
        // create preferences
        await this.prisma.preferences.create({
          data: {
            userId: user.id,
            currency: 'USD',
            language: 'English',
          },
        });
        // create credit card
        await this.prisma.creditCardDetails.create({
          data: {
            userId: user.id,
          },
        });
        return this.resHandler.requestSuccessful({
          res,
          message: 'User created successfully',
          status: 201,
        });
      } else {
        return this.resHandler.clientError(res, 'User already exists', 400);
      }
    } catch (err) {
      return this.resHandler.serverError(res, 'Error creating user');
    }
  }
  /**
   * User Login Function
   * @param dto Class containing login details
   * @param res Express Response Object
   * @param req Express Request Object
   * @returns ResponseHandler
   */
  async login(dto: LoginDto, res: Response, req: Request) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (!user) {
        return this.resHandler.clientError(res, 'User does not exist', 400);
      }
      const passwordMatches = await argon.verify(user.password, dto.password);
      if (!passwordMatches) {
        return this.resHandler.clientError(res, 'Incorrect password', 400);
      } else {
        // save user session
        req.session.userId = user.id;
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
   * Verify Account Function
   * @param userId User's Id
   * @param res Express Response Object
   * @returns ResponseHandler
   */
  async verifyAccount(userId: string, res: Response) {
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          verified: true,
        },
      });
      return this.resHandler.requestSuccessful({
        res,
        message: 'Account verification successful.',
        status: 200,
      });
    } catch (err) {
      this.resHandler.serverError(res, 'Error verifying account');
    }
  }

  /**
   * Update Email Function
   * @param dto Class containing new email
   * @param userId User's Id
   * @param res Express Response Object
   * @returns ResponseHandler
   */
  async updateEmail(dto: UpdateEmailDto, userId: string, res: Response) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (user.email === dto.email) {
        return this.resHandler.clientError(
          res,
          'New email cannot be old email',
        );
      }
      await this.prisma.user.update({
        where: { id: userId },
        data: { email: dto.email },
      });
      return this.resHandler.requestSuccessful({
        res,
        message: 'Email updated successfully.',
        status: 200,
      });
    } catch (err) {
      console.log(err);
      return this.resHandler.serverError(res, 'Error updating Email.');
    }
  }
  /**
   * Check Old Password Function
   * @param dto Class containing old password
   * @param userId User's Id
   * @param res Express Response Object
   * @returns ResponseHandler
   */
  async checkOldPassword(
    dto: checkOldPasswordDto,
    userId: string,
    res: Response,
  ) {
    try {
      // takes current password
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      const passwordMatches = await argon.verify(
        user.password,
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
   * @param userId User's Id
   * @param res Express Response Object
   * @returns ResponseHandler
   */
  async resetPassword(dto: ResetPasswordDto, userId: string, res: Response) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      const newPasswordMatchesOld = await argon.verify(
        user.password,
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
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          password: hashedNewPassword,
        },
      });
      return this.resHandler.requestSuccessful({
        res,
        message: 'Password changed successfully',
      });
    } catch (err) {
      return this.resHandler.serverError(res, 'Error updating password');
    }
  }
  /**
   * Logout Function
   * @param req Express Request Object
   * @param res Express Response Object
   * @returns ResponseHandler
   */
  async logout(req: Request, res: Response) {
    try {
      req.session.destroy(() => {
        return this.resHandler.requestSuccessful({
          res,
          message: 'Logout successful',
        });
      });
    } catch (err) {
      return this.resHandler.serverError(err, 'Error logging out');
    }
  }
}
