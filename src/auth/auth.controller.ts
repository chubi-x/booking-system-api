import { Body, Controller, Post, Res, Session } from '@nestjs/common';
import { Response } from 'express';
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
    @Session() session: Record<string, any>,
  ) {
    return await this.authService.login(dto, res, session);
  }
}
