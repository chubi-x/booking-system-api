import {
  Controller,
  Get,
  Res,
  UseGuards,
  Patch,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { GetUser } from '../decorators';
import { AuthGuard } from '../guards';
import { UpdateBioDto, UpdateCreditCardDto, UpdatePreferencesDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/me')
  async getUser(@GetUser() userId: string, @Res() res: Response) {
    return await this.userService.getUser(userId, res);
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string, @Res() res: Response) {
    return await this.userService.getUserById(id, res);
  }

  @UseGuards(AuthGuard)
  @Patch('/update/bio')
  async updateUserBio(
    @GetUser() userId: string,
    @Body() dto: UpdateBioDto,
    @Res() res: Response,
  ) {
    return await this.userService.updateUserBio(userId, dto, res);
  }

  @UseGuards(AuthGuard)
  @Put('/update/preferences')
  async updatePreferences(
    @GetUser() userId: string,
    @Body() dto: UpdatePreferencesDto,
    @Res() res: Response,
  ) {
    return await this.userService.updateUserPreferences(userId, dto, res);
  }

  @UseGuards(AuthGuard)
  @Put('/update/credit-card-details')
  async updateCreditCard(
    @GetUser() userId: string,
    @Body() dto: UpdateCreditCardDto,
    @Res() res: Response,
  ) {
    return await this.userService.updateUserCreditCardInfo(userId, dto, res);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete')
  async deleteUser(@GetUser() userId: string, @Res() res: Response) {
    return await this.userService.deleteUser(userId, res);
  }
}
