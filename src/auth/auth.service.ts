import * as argon from 'argon2';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from '../database/database.service';
import { HelpersService } from '../helpers/helpers.service';
import { SignupDto } from './dto';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private resHandler: HelpersService.ResponseHandler,
  ) {}

  async signup(dto: SignupDto, res: Response) {
    const password = await argon.hash(dto.password);
    try {
      await this.prisma.user.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          password,
        },
      });
      return this.resHandler.requestSuccessful({
        res,
        message: 'User created successfully',
        status: 201,
      });
    } catch (err) {
      this.resHandler.serverError(res, 'Error creating user');
    }
  }
}
