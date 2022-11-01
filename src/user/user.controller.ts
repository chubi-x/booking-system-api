import {
  Controller,
  Get,
  Res,
  UseGuards,
  Patch,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { GetUser } from '../decorators';
import { AuthGuard } from '../guards';
import { UpdateBioDto, UpdateCreditCardDto, UpdatePreferencesDto } from './dto';
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
  @Patch('/update/bio')
  async updateUserBio(
    @GetUser() userId: string,
    @Body() dto: UpdateBioDto,
    @Res() res: Response,
  ) {
    return await this.userService.updateUserBio(userId, dto, res);
  }
  @Put('/update/preferences')
  async updatePreferences(
    @GetUser() userId: string,
    @Body() dto: UpdatePreferencesDto,
    @Res() res: Response,
  ) {
    return await this.userService.updateUserPreferences(userId, dto, res);
  }

  @Put('/update/credit-card-details')
  async updateCreditCard(
    @GetUser() userId: string,
    @Body() dto: UpdateCreditCardDto,
    @Res() res: Response,
  ) {
    return await this.userService.updateUserCreditCardInfo(userId, dto, res);
  }
  @Delete('/delete')
  async deleteUser(@GetUser() userId: string, @Res() res: Response) {
    return await this.userService.deleteUser(userId, res);
  }
  // delete user (DELETE)
}
