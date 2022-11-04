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
exports.HotelService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const argon = require("argon2");
const helpers_service_1 = require("../helpers/helpers.service");
let HotelService = class HotelService {
    constructor(prisma, resHandler) {
        this.prisma = prisma;
        this.resHandler = resHandler;
    }
    async registerHotel(dto, res) {
        try {
            const hotel = await this.prisma.hotel.findUnique({
                where: { email: dto.email },
            });
            if (!hotel) {
                const password = await argon.hash(dto.password);
                const hotel = await this.prisma.hotel.create({
                    data: Object.assign(Object.assign({}, dto), { password }),
                });
                return this.resHandler.requestSuccessful({
                    res,
                    message: 'Hotel registered successfully',
                });
            }
            else {
                return this.resHandler.clientError(res, 'Hotel already registered');
            }
        }
        catch (err) {
            return this.resHandler.serverError(res, 'Error registering hotel');
        }
    }
    async loginHotel(dto, req, res) {
        try {
            const hotel = await this.prisma.hotel.findUnique({
                where: {
                    email: dto.email,
                },
            });
            if (!hotel) {
                return this.resHandler.clientError(res, 'Hotel does not exist', 400);
            }
            const passwordMatches = await argon.verify(hotel.password, dto.password);
            if (!passwordMatches) {
                return this.resHandler.clientError(res, 'Incorrect password', 400);
            }
            else {
                req.session.hotelId = hotel.id;
                return this.resHandler.requestSuccessful({
                    res,
                    message: 'Login successful',
                    status: 200,
                });
            }
        }
        catch (err) {
            return this.resHandler.serverError(res, 'Error logging in');
        }
    }
    async getHotel(hotelId, res) {
        try {
            const hotel = await this.prisma.hotel.findUnique({
                where: { id: hotelId },
            });
            delete hotel.createdAt;
            delete hotel.password;
            return this.resHandler.requestSuccessful({
                res,
                payload: Object.assign({}, hotel),
                message: 'Hotel details retrieved successfully',
            });
        }
        catch (err) {
            return this.resHandler.serverError(res, 'Error getting hotel details');
        }
    }
    async getHotelById(id, res) {
        try {
            const hotel = await this.prisma.hotel.findUnique({ where: { id } });
            delete hotel.password;
            delete hotel.createdAt;
            return this.resHandler.requestSuccessful({
                res,
                payload: Object.assign({}, hotel),
                message: 'Hotel retrieved successfully',
            });
        }
        catch (err) {
            console.log(err);
            return this.resHandler.serverError(res, 'Error retrieving hotel details');
        }
    }
    async getAllHotelRooms(hotelId, res) {
        try {
            const hotel = await this.prisma.hotel.findUnique({
                where: { id: hotelId },
            });
            if (!hotel) {
                return this.resHandler.clientError(res, 'Hotel does not exist');
            }
            else {
                const rooms = await this.prisma.room.findMany({ where: { hotelId } });
                if (!rooms) {
                    return this.resHandler.clientError(res, 'You do not have any rooms yet.');
                }
                else {
                    return this.resHandler.requestSuccessful({
                        res,
                        payload: { rooms },
                        message: 'Rooms retrieved successfully',
                    });
                }
            }
        }
        catch (err) {
            return this.resHandler.serverError(res, 'Error retrieving hotel rooms');
        }
    }
    async getAllHotelBookings(hotelId, res) {
        try {
            const hotel = await this.prisma.hotel.findUnique({
                where: { id: hotelId },
            });
            if (!hotel) {
                return this.resHandler.clientError(res, 'Hotel does not exist');
            }
            else {
                const bookings = await this.prisma.booking.findMany({
                    where: { hotelId },
                });
                if (!bookings) {
                    return this.resHandler.clientError(res, 'You do not have any rooms yet.');
                }
                else {
                    return this.resHandler.requestSuccessful({
                        res,
                        payload: { bookings },
                        message: 'Bookings retrieved successfully',
                    });
                }
            }
        }
        catch (err) {
            return this.resHandler.serverError(res, 'Error retrieving hotel bookings');
        }
    }
    async getAllHotels(res) {
        try {
            const hotels = await this.prisma.hotel.findMany({
                select: {
                    id: true,
                    name: true,
                    address: true,
                    phone: true,
                    email: true,
                    stars: true,
                },
            });
            return this.resHandler.requestSuccessful({ res, payload: Object.assign({}, hotels) });
        }
        catch (err) {
            console.log(err);
            return this.resHandler.serverError(res, 'Error getting all hotels');
        }
    }
    async updateHotelDetails(hotelId, dto, res) {
        try {
            await this.prisma.hotel.update({
                where: { id: hotelId },
                data: Object.assign({}, dto),
            });
            return this.resHandler.requestSuccessful({
                res,
                message: 'Hotel details updated successfully',
            });
        }
        catch (err) {
            console.log(err);
            return this.resHandler.serverError(res, 'Error updating hotel details');
        }
    }
    async checkOldPassword(dto, hotelId, res) {
        try {
            const hotel = await this.prisma.hotel.findUnique({
                where: { id: hotelId },
            });
            const passwordMatches = await argon.verify(hotel.password, dto.currentPassword);
            if (!passwordMatches) {
                return this.resHandler.clientError(res, 'Password does not match', 400);
            }
            else {
                return this.resHandler.requestSuccessful({
                    res,
                    message: 'Passwords match',
                    status: 200,
                });
            }
        }
        catch (err) {
            return this.resHandler.serverError(res, 'Error checking old password');
        }
    }
    async resetPassword(dto, hotelId, res) {
        try {
            const hotel = await this.prisma.hotel.findUnique({
                where: { id: hotelId },
            });
            const newPasswordMatchesOld = await argon.verify(hotel.password, dto.newPassword);
            if (newPasswordMatchesOld) {
                return this.resHandler.clientError(res, 'New password must not be old password', 400);
            }
            const hashedNewPassword = await argon.hash(dto.newPassword);
            await this.prisma.hotel.update({
                where: { id: hotelId },
                data: {
                    password: hashedNewPassword,
                },
            });
            return this.resHandler.requestSuccessful({
                res,
                message: 'Password changed successfully',
            });
        }
        catch (err) {
            console.log(err);
            return this.resHandler.serverError(res, 'Error updating password');
        }
    }
};
HotelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.PrismaService, helpers_service_1.HelpersService.ResponseHandler])
], HotelService);
exports.HotelService = HotelService;
//# sourceMappingURL=hotel.service.js.map