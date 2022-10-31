import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/database.service';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(body) {
    await this.prisma.user.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
      },
    });
    return body;
  }

  login() {
    return 'login';
  }
}
