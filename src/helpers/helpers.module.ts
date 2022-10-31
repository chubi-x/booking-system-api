import { Global, Module } from '@nestjs/common';
import { HelpersService } from './helpers.service';
@Global()
@Module({
  providers: [HelpersService.ResponseHandler],
  exports: [HelpersService.ResponseHandler],
})
export class HelpersModule {}
