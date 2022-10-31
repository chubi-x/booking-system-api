import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body) {
    return await this.authService.signup(body);
  }

  @Post('login')
  login() {
    return this.authService.login();
  }
}
