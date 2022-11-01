import { Controller, Get, Res, Req, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '../guards';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  // get user
  @UseGuards(AuthGuard)
  @Get('')
  async getUser(@Req() req: Request, @Res() res: Response) {
    return this.userService.getUser(req, res);
  }
  // update user
  // verify account
  // reset password
  // delete user
}
