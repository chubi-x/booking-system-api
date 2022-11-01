import { Controller, Get, Res, UseGuards, Patch, Body } from '@nestjs/common';
import { Response } from 'express';
import { GetUser } from '../decorators';
import { AuthGuard } from '../guards';
import { UpdateBioDto } from './dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  async getUser(@GetUser() userId: string, @Res() res: Response) {
    return await this.userService.getUser(userId, res);
  }
  // update user bio
  @Patch('')
  async updateUserBio(
    @GetUser() userId: string,
    @Body() dto: UpdateBioDto,
    @Res() res: Response,
  ) {
    return await this.userService.updateUserBio(userId, dto, res);
  }
  // update preferences (PUT)
  // update credit card info (PUT)
  // verify account (PATCH)
  // change email (PATCH)
  // reset password (PATCH)
  // delete user (DELETE)
}
