import {
  Body,
  Controller,
  Post,
  Res,
  Req,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GetUser } from '../decorators';
import { AuthGuard } from '../guards';
import { AuthService } from './auth.service';
import {
  checkOldPasswordDto,
  LoginDto,
  ResetPasswordDto,
  SignupDto,
  UpdateEmailDto,
} from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto, @Res() res: Response) {
    return await this.authService.signup(dto, res);
  }
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    return await this.authService.login(dto, res, req);
  }
  @UseGuards(AuthGuard)
  @Patch('/verify-account')
  async verifyAccount(@GetUser() userId: string, @Res() res: Response) {
    return await this.authService.verifyAccount(userId, res);
  }

  @UseGuards(AuthGuard)
  @Patch('/update-email')
  async updateEmail(
    @Body() dto: UpdateEmailDto,
    @GetUser() userId: string,
    @Res() res: Response,
  ) {
    return await this.authService.updateEmail(dto, userId, res);
  }

  // Routes to reset password
  @UseGuards(AuthGuard)
  @Patch('/check-old-password')
  async checkOldPassword(
    @Body() dto: checkOldPasswordDto,
    @GetUser() userId: string,
    @Res() res: Response,
  ) {
    return await this.authService.checkOldPassword(dto, userId, res);
  }

  @UseGuards(AuthGuard)
  @Patch('/reset-password')
  async resetPassword(
    @Body() dto: ResetPasswordDto,
    @GetUser() userId: string,
    @Res() res: Response,
  ) {
    return await this.authService.resetPassword(dto, userId, res);
  }
}
