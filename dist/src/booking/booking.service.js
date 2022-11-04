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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const helpers_service_1 = require("../helpers/helpers.service");
let BookingService = class BookingService {
    constructor(prisma, resHandler) {
        this.prisma = prisma;
        this.resHandler = resHandler;
    }
    async createBooking(userId, dto, res) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });
            const room = await this.prisma.room.findUnique({
                where: { id: dto.roomId },
            });
            if (user && room) {
                if (dto.numberOfRooms < room.numberAvailable) {
                    await this.prisma.booking.create({
                        data: Object.assign(Object.assign({}, dto), { cost: dto.numberOfRooms * room.price, userId: user.id, roomId: room.id, hotelId: room.hotelId }),
                    });
                    await this.prisma.room.update({
                        where: { id: room.id },
                        data: { numberAvailable: room.numberAvailable - dto.numberOfRooms },
                    });
                    return this.resHandler.requestSuccessful({
                        res,
                        message: 'Booking created successfully',
                    });
                }
                else {
                    return this.resHandler.clientError(res, 'The number of available rooms is less than your desired booking');
                }
            }
            else {
                return this.resHandler.clientError(res, 'User or room does not exist.');
            }
        }
        catch (err) {
            console.log(err);
            return this.resHandler.serverError(res, 'Error creating booking');
        }
    }
    async updateBookingById(bookingId, userId, dto, res) {
        try {
            const booking = await this.prisma.booking.findUnique({
                where: { id: bookingId },
            });
            const room = await this.prisma.room.findUnique({
                where: { id: dto.roomId },
            });
            if (booking) {
                if (dto.numberOfRooms && dto.numberOfRooms <= booking.numberOfRooms) {
                    await this.prisma.room.update({
                        where: { id: room.id },
                        data: {
                            numberAvailable: room.numberAvailable +
                                booking.numberOfRooms -
                                dto.numberOfRooms,
                        },
                    });
                }
                else if (dto.numberOfRooms &&
                    dto.numberOfRooms > booking.numberOfRooms &&
                    dto.numberOfRooms <= room.numberAvailable) {
                    await this.prisma.room.update({
                        where: { id: room.id },
                        data: {
                            numberAvailable: room.numberAvailable -
                                dto.numberOfRooms +
                                booking.numberOfRooms,
                        },
                    });
                }
                else if (dto.numberOfRooms > room.numberAvailable) {
                    return this.resHandler.clientError(res, 'The number of available rooms is less than your desired booking');
                }
                await this.prisma.booking.update({
                    where: { id: bookingId },
                    data: Object.assign({}, dto),
                });
                return this.resHandler.requestSuccessful({
                    res,
                    message: 'Booking updated successfully',
                });
            }
            else {
                return this.resHandler.clientError(res, 'Booking does not exist');
            }
        }
        catch (err) {
            console.log(err);
            return this.resHandler.serverError(res, 'Error updating booking details');
        }
    }
    async getBookingById(id, res) {
        try {
            const booking = await this.prisma.booking.findUnique({ where: { id } });
            if (booking) {
                delete booking.createdAt;
                delete booking.updatedAt;
                delete booking.userId;
                return this.resHandler.requestSuccessful({
                    res,
                    payload: Object.assign({}, booking),
                    message: 'Booking retrieved successfully',
                });
            }
            else {
                return this.resHandler.clientError(res, 'Booking does not exist');
            }
        }
        catch (err) {
            return this.resHandler.serverError(res, 'Error retrieving booking');
        }
    }
    async getAllBookingsByUser(userId, res) {
        try {
            const user = await this.prisma.user.findUnique({ where: { id: userId } });
            if (user) {
                const bookings = await this.prisma.booking.findMany({
                    where: { userId },
                });
                if (bookings) {
                    bookings.forEach((booking) => {
                        delete booking.hotelId;
                        delete booking.roomId;
                        delete booking.createdAt;
                        delete booking.updatedAt;
                        delete booking.userId;
                    });
                    return this.resHandler.requestSuccessful({
                        res,
                        payload: bookings,
                        message: 'Bookings retrieved successfully',
                    });
                }
                else {
                    return this.resHandler.clientError(res, "You don't have any bookings");
                }
            }
            else {
                return this.resHandler.clientError(res, 'User does not exist');
            }
        }
        catch (err) {
            return this.resHandler.serverError(res, 'There was an error getting your bookings');
        }
    }
    async deleteBookingById(id, res) {
        try {
            const booking = await this.prisma.booking.findUnique({ where: { id } });
            if (booking) {
                await this.prisma.booking.delete({ where: { id } });
                return this.resHandler.requestSuccessful({
                    res,
                    message: 'Booking deleted successfully',
                });
            }
            else {
                return this.resHandler.clientError(res, 'Booking does not exist');
            }
        }
        catch (err) {
            return this.resHandler.serverError(res, 'There was an error deleting this booking');
        }
    }
    async deleteAllBookings(userId, res) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user) {
                return this.resHandler.clientError(res, 'User does not exist');
            }
            else {
                const bookings = await this.prisma.booking.findMany({
                    where: { userId },
                });
                if (!bookings) {
                    return this.resHandler.clientError(res, "You don't have any bookings");
                }
                else {
                    await this.prisma.booking.deleteMany({ where: { userId } });
                    return this.resHandler.requestSuccessful({
                        res,
                        message: 'Bookings deleted successfully',
                    });
                }
            }
        }
        catch (err) {
            return this.resHandler.serverError(res, 'Error deleting all bookings');
        }
    }
};
BookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.PrismaService, helpers_service_1.HelpersService.ResponseHandler])
], BookingService);
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map