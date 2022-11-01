import * as argon from 'argon2';
import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from '../database/database.service';
import { HelpersService } from '../helpers/helpers.service';
import { LoginDto, SignupDto } from './dto';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private resHandler: HelpersService.ResponseHandler,
  ) {}

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
      } else {
        return this.resHandler.clientError(res, 'User already exists', 400);
      }
    } catch (err) {
      return this.resHandler.serverError(res, 'Error creating user');
    }
  }
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
      const passwordMatches = argon.verify(user.password, dto.password);
      if (!passwordMatches) {
        return this.resHandler.clientError(res, 'Incorrect password', 400);
      }
      // save user session
      req.session.userId = user.id;
      return this.resHandler.requestSuccessful({
        res,
        message: 'Login successful',
        status: 200,
      });
    } catch (err) {
      return this.resHandler.serverError(res, 'Error logging in');
    }
  }
}
