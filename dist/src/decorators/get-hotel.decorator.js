"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetHotel = void 0;
const common_1 = require("@nestjs/common");
exports.GetHotel = (0, common_1.createParamDecorator)((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return req.session.hotelId;
});
//# sourceMappingURL=get-hotel.decorator.js.map