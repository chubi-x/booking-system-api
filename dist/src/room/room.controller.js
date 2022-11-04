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
exports.RoomController = void 0;
const common_1 = require("@nestjs/common");
const room_service_1 = require("./room.service");
const decorators_1 = require("../decorators");
const guards_1 = require("../guards");
const dto_1 = require("./dto");
let RoomController = class RoomController {
    constructor(roomService) {
        this.roomService = roomService;
    }
    async newRoom(hotelId, dto, res) {
        return await this.roomService.newRoom(hotelId, dto, res);
    }
    async getRoomsByHotel(hotelId, res) {
        return await this.roomService.getRoomsByHotel(hotelId, res);
    }
    async getAllRooms(res) {
        return await this.roomService.getAllRooms(res);
    }
    async getRoomById(id, res) {
        return await this.roomService.getRoomById(id, res);
    }
    async updateRoomById(dto, id, res) {
        return await this.roomService.updateRoomById(dto, id, res);
    }
    async deleteRoomById(id, res) {
        return await this.roomService.deleteRoomById(id, res);
    }
};
__decorate([
    (0, common_1.UseGuards)(guards_1.HotelAuthGuard),
    (0, common_1.Post)('/new'),
    __param(0, (0, decorators_1.GetHotel)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.NewRoomDto, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "newRoom", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.HotelAuthGuard),
    (0, common_1.Get)('/mine'),
    __param(0, (0, decorators_1.GetHotel)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getRoomsByHotel", null);
__decorate([
    (0, common_1.Get)('/all'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getAllRooms", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getRoomById", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.HotelAuthGuard),
    (0, common_1.Patch)('/update/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateRoomDto, String, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "updateRoomById", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.HotelAuthGuard),
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "deleteRoomById", null);
RoomController = __decorate([
    (0, common_1.Controller)('hotels/rooms'),
    __metadata("design:paramtypes", [room_service_1.RoomService])
], RoomController);
exports.RoomController = RoomController;
//# sourceMappingURL=room.controller.js.map