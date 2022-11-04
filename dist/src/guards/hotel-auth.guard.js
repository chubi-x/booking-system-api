"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelAuthGuard = void 0;
class HotelAuthGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return validateRequest(request);
    }
}
exports.HotelAuthGuard = HotelAuthGuard;
function validateRequest(request) {
    if (request.session.hotelId) {
        return true;
    }
    return false;
}
//# sourceMappingURL=hotel-auth.guard.js.map