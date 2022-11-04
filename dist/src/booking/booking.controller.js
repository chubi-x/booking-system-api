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
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("./booking.service");
const guards_1 = require("../guards");
const decorators_1 = require("../decorators");
const dto_1 = require("./dto");
let BookingController = class BookingController {
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    async getBookingById(id, res) {
        return this.bookingService.getBookingById(id, res);
    }
    async getAllBookingsByUser(userId, res) {
        return this.bookingService.getAllBookingsByUser(userId, res);
    }
    async createBooking(userId, dto, res) {
        return await this.bookingService.createBooking(userId, dto, res);
    }
    async updateBookingById(bookingId, userId, dto, res) {
        return await this.bookingService.updateBookingById(bookingId, userId, dto, res);
    }
    async deleteBookingById(id, res) {
        return await this.bookingService.deleteBookingById(id, res);
    }
    async deleteAllBookings(userId, res) {
        return await this.bookingService.deleteAllBookings(userId, res);
    }
};
__decorate([
    (0, common_1.Get)('/booking/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getBookingById", null);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getAllBookingsByUser", null);
__decorate([
    (0, common_1.Post)('/new'),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.CreateBookingDto, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "createBooking", null);
__decorate([
    (0, common_1.Patch)('/booking/update/:bookingId'),
    __param(0, (0, common_1.Param)('bookingId')),
    __param(1, (0, decorators_1.GetUser)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, dto_1.UpdateBookingDto, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "updateBookingById", null);
__decorate([
    (0, common_1.Delete)('/booking/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "deleteBookingById", null);
__decorate([
    (0, common_1.Delete)('/delete/all'),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "deleteAllBookings", null);
BookingController = __decorate([
    (0, common_1.UseGuards)(guards_1.AuthGuard),
    (0, common_1.Controller)('bookings'),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingController);
exports.BookingController = BookingController;
//# sourceMappingURL=booking.controller.js.map