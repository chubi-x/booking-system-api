"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpersService = void 0;
const common_1 = require("@nestjs/common");
let HelpersService = class HelpersService {
    constructor(resHandler) {
        this.resHandler = resHandler;
    }
};
HelpersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [HelpersService.ResponseHandler])
], HelpersService);
exports.HelpersService = HelpersService;
(function (HelpersService) {
    class ResponseHandler {
        constructor() {
            this.DEFAULT_SERVER_ERROR = 'Internal server error.';
            this.DEFAULT_SUCCESS_MESSAGE = 'Request successful.';
            this.DEFAULT_CLIENT_ERROR_STATUS_CODE = 400;
            this.DEFAULT_SUCCESS_STATUS_CODE = 200;
        }
        serverError(res, message) {
            return res.status(500).json({
                success: false,
                error: message !== null && message !== void 0 ? message : this.DEFAULT_SERVER_ERROR,
            });
        }
        clientError(res, message, status = this.DEFAULT_CLIENT_ERROR_STATUS_CODE) {
            return res.status(status).json({
                success: false,
                message,
            });
        }
        requestSuccessful({ res, payload, message, status = this.DEFAULT_SUCCESS_STATUS_CODE, }) {
            const responseObject = {
                success: true,
                message: message !== null && message !== void 0 ? message : this.DEFAULT_SUCCESS_MESSAGE,
            };
            if (!payload) {
                return res.status(status).send(responseObject);
            }
            return res.status(status).send(Object.assign(Object.assign({}, responseObject), { data: payload }));
        }
    }
    HelpersService.ResponseHandler = ResponseHandler;
})(HelpersService = exports.HelpersService || (exports.HelpersService = {}));
exports.HelpersService = HelpersService;
//# sourceMappingURL=helpers.service.js.map