"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
class AuthGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return validateRequest(request);
    }
}
exports.AuthGuard = AuthGuard;
function validateRequest(request) {
    if (request.session.userId) {
        return true;
    }
    return false;
}
//# sourceMappingURL=auth.guard.js.map