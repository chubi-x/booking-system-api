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
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const helpers_service_1 = require("../helpers/helpers.service");
let RoomService = class RoomService {
    constructor(prisma, resHandler) {
        this.prisma = prisma;
        this.resHandler = resHandler;
    }
    async newRoom(hotelId, dto, res) {
        try {
            await this.prisma.room.create({
                data: Object.assign({ hotelId }, dto),
            });
            return this.resHandler.requestSuccessful({
                res,
                message: 'Room added successfully',
            });
        }
        catch (err) {
            return this.resHandler.serverError(res, 'Error creating new room');
        }
    }
    async getRoomsByHotel(hotelId, res) {
        try {
            const rooms = await this.prisma.room.findMany({ where: { hotelId } });
            return this.resHandler.requestSuccessful({
                res,
                payload: { rooms },
                message: 'Rooms retrieved successfully',
            });
        }
        catch (err) {
            return this.resHandler.serverError(res, 'Error getting rooms');
        }
    }
    async getAllRooms(res) {
        try {
            const payload = await this.prisma.room.findMany();
            return this.resHandler.requestSuccessful({
                res,
                payload,
                message: 'Rooms retrieved successfully',
            });
        }
        catch (err) {
            return this.resHandler.serverError(res, 'Error fetching all rooms');
        }
    }
    async getRoomById(id, res) {
        try {
            const room = await this.prisma.room.findUnique({ where: { id } });
            if (room) {
                return this.resHandler.requestSuccessful({
                    res,
                    payload: Object.assign({}, room),
                    message: 'Room retrieved successfully',
                });
            }
            else {
                return this.resHandler.clientError(res, 'Room does not exist');
            }
        }
        catch (err) {
            return this.resHandler.serverError(res, 'Error retrieving hotel');
        }
    }
    async updateRoomById(dto, id, res) {
        try {
            const room = await this.prisma.room.findUnique({
                where: { id },
            });
            if (room) {
                await this.prisma.room.update({
                    where: { id },
                    data: Object.assign({}, dto),
                });
                return this.resHandler.requestSuccessful({
                    res,
                    message: 'Room details updated successfully',
                });
            }
            else {
                return this.resHandler.serverError(res, 'Room does not exist!');
            }
        }
        catch (err) {
            return this.resHandler.serverError(res, 'Error updating room details');
        }
    }
    async deleteRoomById(id, res) {
        try {
            const room = await this.prisma.room.findUnique({ where: { id } });
            if (room) {
                await this.prisma.room.delete({ where: { id } });
                return this.resHandler.requestSuccessful({
                    res,
                    message: 'Room deleted successfully',
                });
            }
            else {
                return this.resHandler.clientError(res, 'Room does not exist!');
            }
        }
        catch (err) {
            console.log(err);
            return this.resHandler.serverError(res, 'Error deleting room');
        }
    }
};
RoomService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.PrismaService, helpers_service_1.HelpersService.ResponseHandler])
], RoomService);
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map