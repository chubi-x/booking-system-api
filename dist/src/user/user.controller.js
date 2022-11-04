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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../decorators");
const guards_1 = require("../guards");
const dto_1 = require("./dto");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUser(userId, res) {
        return await this.userService.getUser(userId, res);
    }
    async getUserById(id, res) {
        return await this.userService.getUserById(id, res);
    }
    async updateUserBio(userId, dto, res) {
        return await this.userService.updateUserBio(userId, dto, res);
    }
    async updatePreferences(userId, dto, res) {
        return await this.userService.updateUserPreferences(userId, dto, res);
    }
    async updateCreditCard(userId, dto, res) {
        return await this.userService.updateUserCreditCardInfo(userId, dto, res);
    }
    async deleteUser(userId, res) {
        return await this.userService.deleteUser(userId, res);
    }
};
__decorate([
    (0, common_1.UseGuards)(guards_1.AuthGuard),
    (0, common_1.Get)('/me'),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AuthGuard),
    (0, common_1.Patch)('/update/bio'),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateBioDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserBio", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AuthGuard),
    (0, common_1.Put)('/update/preferences'),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdatePreferencesDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePreferences", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AuthGuard),
    (0, common_1.Put)('/update/credit-card-details'),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateCreditCardDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateCreditCard", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AuthGuard),
    (0, common_1.Delete)('/delete'),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map