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
import { LoginDto, SignupDto } from './dto';

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

  // change email (PATCH)
  // reset password (PATCH)
}
