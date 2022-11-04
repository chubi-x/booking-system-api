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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const hotel_service_1 = require("./hotel.service");
const decorators_1 = require("../decorators");
const guards_1 = require("../guards");
const dto_2 = require("../auth/dto");
let HotelController = class HotelController {
    constructor(hotelService) {
        this.hotelService = hotelService;
    }
    async getHotel(hotelId, res) {
        return await this.hotelService.getHotel(hotelId, res);
    }
    async getAllHotelRooms(hotelId, res) {
        return await this.hotelService.getAllHotelRooms(hotelId, res);
    }
    async getAllHotelBookings(hotelId, res) {
        return await this.hotelService.getAllHotelBookings(hotelId, res);
    }
    async getAllHotels(res) {
        return await this.hotelService.getAllHotels(res);
    }
    async getHotelById(id, res) {
        return await this.hotelService.getHotelById(id, res);
    }
    async registerHotel(dto, res) {
        return await this.hotelService.registerHotel(dto, res);
    }
    async loginHotel(dto, req, res) {
        return await this.hotelService.loginHotel(dto, req, res);
    }
    async updateHotelDetails(hotelId, dto, res) {
        return await this.hotelService.updateHotelDetails(hotelId, dto, res);
    }
    async checkOldPassword(dto, hotelId, res) {
        return await this.hotelService.checkOldPassword(dto, hotelId, res);
    }
    async resetPassword(dto, hotelId, res) {
        return await this.hotelService.resetPassword(dto, hotelId, res);
    }
};
__decorate([
    (0, common_1.UseGuards)(guards_1.HotelAuthGuard),
    (0, common_1.Get)('/mine'),
    __param(0, (0, decorators_1.GetHotel)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], HotelController.prototype, "getHotel", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.HotelAuthGuard),
    (0, common_1.Get)('/mine/rooms'),
    __param(0, (0, decorators_1.GetHotel)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], HotelController.prototype, "getAllHotelRooms", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.HotelAuthGuard),
    (0, common_1.Get)('/mine/bookings'),
    __param(0, (0, decorators_1.GetHotel)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], HotelController.prototype, "getAllHotelBookings", null);
__decorate([
    (0, common_1.Get)('/all'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HotelController.prototype, "getAllHotels", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], HotelController.prototype, "getHotelById", null);
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RegisterHotelDto, Object]),
    __metadata("design:returntype", Promise)
], HotelController.prototype, "registerHotel", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LoginHotelDto, Object, Object]),
    __metadata("design:returntype", Promise)
], HotelController.prototype, "loginHotel", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.HotelAuthGuard),
    (0, common_1.Patch)('/mine/update'),
    __param(0, (0, decorators_1.GetHotel)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateHotelDto, Object]),
    __metadata("design:returntype", Promise)
], HotelController.prototype, "updateHotelDetails", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.HotelAuthGuard),
    (0, common_1.Patch)('/auth/check-old-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetHotel)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.checkOldPasswordDto, String, Object]),
    __metadata("design:returntype", Promise)
], HotelController.prototype, "checkOldPassword", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.HotelAuthGuard),
    (0, common_1.Patch)('/auth/reset-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetHotel)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.ResetPasswordDto, String, Object]),
    __metadata("design:returntype", Promise)
], HotelController.prototype, "resetPassword", null);
HotelController = __decorate([
    (0, common_1.Controller)('hotels'),
    __metadata("design:paramtypes", [hotel_service_1.HotelService])
], HotelController);
exports.HotelController = HotelController;
//# sourceMappingURL=hotel.controller.js.map