import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';
import { HotelModule } from './hotel/hotel.module';

@Module({
  imports: [AuthModule, UserModule, BookingModule, HotelModule],
})
export class AppModule {}
