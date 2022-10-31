import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  // connect prisma to the postgres database using the config service

  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  // function to cleanup db
  cleanDb() {
    return this.$transaction([
      this.user.deleteMany(),
      this.preferences.deleteMany(),
      this.creditCardDetails.deleteMany(),
      this.hotel.deleteMany(),
      this.room.deleteMany(),
      this.booking.deleteMany(),
    ]);
  }
}
