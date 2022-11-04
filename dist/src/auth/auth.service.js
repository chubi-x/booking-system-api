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
exports.AuthService = void 0;
const argon = require("argon2");
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const helpers_service_1 = require("../helpers/helpers.service");
let AuthService = class AuthService {
    constructor(prisma, resHandler) {
        this.prisma = prisma;
        this.resHandler = resHandler;
    }
    async signup(dto, res) {
        const password = await argon.hash(dto.password);
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: dto.email,
                },
            });
            if (!user) {
                const user = await this.prisma.user.create({
                    data: {
                        firstName: dto.firstName,
                        lastName: dto.lastName,
                        email: dto.email,
                        password,
                    },
                });
                await this.prisma.preferences.create({
                    data: {
                        userId: user.id,
                        currency: 'USD',
                        language: 'English',
                    },
                });
                await this.prisma.creditCardDetails.create({
                    data: {
                        userId: user.id,
                    },
                });
                return this.resHandler.requestSuccessful({
                    res,
                    message: 'User created successfully',
                    status: 201,
                });
            }
            else {
                return this.resHandler.clientError(res, 'User already exists', 400);
            }
        }
        catch (err) {
            return this.resHandler.serverError(res, 'Error creating user');
        }
    }
    async login(dto, res, req) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: dto.email,
                },
            });
            if (!user) {
                return this.resHandler.clientError(res, 'User does not exist', 400);
            }
            const passwordMatches = await argon.verify(user.password, dto.password);
            if (!passwordMatches) {
                return this.resHandler.clientError(res, 'Incorrect password', 400);
            }
            else {
                req.session.userId = user.id;
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
    async verifyAccount(userId, res) {
        try {
            await this.prisma.user.update({
                where: { id: userId },
                data: {
                    verified: true,
                },
            });
            return this.resHandler.requestSuccessful({
                res,
                message: 'Account verification successful.',
                status: 200,
            });
        }
        catch (err) {
            this.resHandler.serverError(res, 'Error verifying account');
        }
    }
    async updateEmail(dto, userId, res) {
        try {
            await this.prisma.user.update({
                where: { id: userId },
                data: { email: dto.email },
            });
            return this.resHandler.requestSuccessful({
                res,
                message: 'Email updated successfully.',
                status: 200,
            });
        }
        catch (err) {
            console.log(err);
            return this.resHandler.serverError(res, 'Error updating Email.');
        }
    }
    async checkOldPassword(dto, userId, res) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });
            const passwordMatches = await argon.verify(user.password, dto.currentPassword);
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
    async resetPassword(dto, userId, res) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });
            const newPasswordMatchesOld = await argon.verify(user.password, dto.newPassword);
            if (newPasswordMatchesOld) {
                return this.resHandler.clientError(res, 'New password must not be old password', 400);
            }
            const hashedNewPassword = await argon.hash(dto.newPassword);
            await this.prisma.user.update({
                where: { id: userId },
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
            return this.resHandler.serverError(res, 'Error updating password');
        }
    }
    async logout(req, res) {
        try {
            req.session.destroy(() => {
                return this.resHandler.requestSuccessful({
                    res,
                    message: 'Logout successful',
                });
            });
        }
        catch (err) {
            return this.resHandler.serverError(err, 'Error logging out');
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.PrismaService, helpers_service_1.HelpersService.ResponseHandler])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map