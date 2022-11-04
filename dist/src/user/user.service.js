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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const helpers_service_1 = require("../helpers/helpers.service");
let UserService = class UserService {
    constructor(prisma, resHandler) {
        this.prisma = prisma;
        this.resHandler = resHandler;
    }
    async getUser(userId, res) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (user) {
                delete user.createdAt;
                delete user.password;
                const preferences = await this.prisma.preferences.findUnique({
                    where: { userId },
                });
                delete preferences.id;
                delete preferences.userId;
                const creditCardDetails = await this.prisma.creditCardDetails.findUnique({
                    where: { userId },
                });
                delete creditCardDetails.id;
                delete creditCardDetails.userId;
                const payload = {
                    user: Object.assign(Object.assign({}, user), { preferences, creditCardDetails }),
                };
                return this.resHandler.requestSuccessful({ res, payload });
            }
            else {
                return this.resHandler.clientError(res, 'This user does not exist!');
            }
        }
        catch (err) {
            return this.resHandler.serverError(res, 'Error getting user details');
        }
    }
    async getUserById(id, res) {
        try {
            const user = await this.prisma.user.findUnique({ where: { id } });
            if (!user) {
                return this.resHandler.clientError(res, 'User does not exist');
            }
            else {
                delete user.createdAt;
                delete user.password;
                return this.resHandler.requestSuccessful({
                    res,
                    payload: { user },
                    message: 'user retrieved successfully',
                });
            }
        }
        catch (err) {
            return this.resHandler.serverError(res, 'Error retrieving user');
        }
    }
    async updateUserBio(userId, dto, res) {
        try {
            const user = await this.prisma.user.findUnique({ where: { id: userId } });
            if (user) {
                await this.prisma.user.update({
                    where: { id: userId },
                    data: Object.assign({}, dto),
                });
                return this.resHandler.requestSuccessful({
                    res,
                    message: 'User details updated successfully',
                });
            }
            else {
                return this.resHandler.clientError(res, 'This user does not exist!');
            }
        }
        catch (err) {
            return this.resHandler.serverError(res, 'Error updating user details');
        }
    }
    async updateUserPreferences(userId, dto, res) {
        try {
            const preferences = await this.prisma.preferences.findUnique({
                where: { userId },
            });
            if (preferences) {
                await this.prisma.preferences.update({
                    where: { userId },
                    data: Object.assign({}, dto),
                });
                return this.resHandler.requestSuccessful({
                    res,
                    message: 'Preferences updated successfully',
                });
            }
            else {
                return this.resHandler.clientError(res, 'There are no preferences associated with this user');
            }
        }
        catch (err) {
            console.log(err);
            return this.resHandler.serverError(res, 'Error updating user preferences');
        }
    }
    async updateUserCreditCardInfo(userId, dto, res) {
        try {
            const creditCard = this.prisma.creditCardDetails.findUnique({
                where: { userId },
            });
            if (creditCard) {
                await this.prisma.creditCardDetails.update({
                    where: { userId },
                    data: Object.assign({}, dto),
                });
                return this.resHandler.requestSuccessful({
                    res,
                    message: 'Credit card details updated successfully',
                });
            }
            else {
                return this.resHandler.clientError(res, 'There are no credit card details associated with this uesr');
            }
        }
        catch (err) {
            return this.resHandler.serverError(res, 'Error updating credit card info');
        }
    }
    async deleteUser(userId, res) {
        try {
            const user = await this.prisma.user.findUnique({ where: { id: userId } });
            if (user) {
                await this.prisma.preferences.delete({ where: { userId } });
                await this.prisma.creditCardDetails.delete({ where: { userId } });
                await this.prisma.user.delete({ where: { id: userId } });
                return this.resHandler.requestSuccessful({
                    res,
                    message: 'User deleted successfully',
                });
            }
            else {
                return this.resHandler.clientError(res, 'User does not exist!');
            }
        }
        catch (err) {
            return this.resHandler.serverError(res, 'Error deleting user');
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.PrismaService, helpers_service_1.HelpersService.ResponseHandler])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map