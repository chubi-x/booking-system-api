import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
export const GetHotel = createParamDecorator(
  (data: null, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    return req.session.hotelId;
  },
);
