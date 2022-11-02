import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';
import { HotelModule } from './hotel/hotel.module';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { BookingService } from './booking/booking.service';
import { HotelService } from './hotel/hotel.service';
import { DatabaseModule } from './database/database.module';
import { HelpersModule } from './helpers/helpers.module';
import { RoomModule } from './room/room.module';
import { RoomService } from './room/room.service';
import { RoomController } from './room/room.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    BookingModule,
    HotelModule,
    DatabaseModule,
    HelpersModule,
    RoomModule,
  ],
  providers: [
    AuthService,
    UserService,
    BookingService,
    HotelService,
    RoomService,
  ],
})
export class AppModule {}
