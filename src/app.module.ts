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
  ],
  providers: [AuthService, UserService, BookingService, HotelService],
})
export class AppModule {}
