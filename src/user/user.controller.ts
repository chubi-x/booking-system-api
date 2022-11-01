import { Controller, Get, Res, Req, UseGuards, Patch } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '../guards';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  // get user
  @Get('')
  async getUser(@Req() req: Request, @Res() res: Response) {
    return await this.userService.getUser(req, res);
  }
  // update user
  @Patch('')
  async editUser() {
    return await this.userService.editUser();
  }
  // verify account
  // reset password
  // delete user
}
