"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const booking_module_1 = require("./booking/booking.module");
const hotel_module_1 = require("./hotel/hotel.module");
const auth_service_1 = require("./auth/auth.service");
const user_service_1 = require("./user/user.service");
const booking_service_1 = require("./booking/booking.service");
const hotel_service_1 = require("./hotel/hotel.service");
const database_module_1 = require("./database/database.module");
const helpers_module_1 = require("./helpers/helpers.module");
const room_module_1 = require("./room/room.module");
const room_service_1 = require("./room/room.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            booking_module_1.BookingModule,
            hotel_module_1.HotelModule,
            database_module_1.DatabaseModule,
            helpers_module_1.HelpersModule,
            room_module_1.RoomModule,
        ],
        providers: [
            auth_service_1.AuthService,
            user_service_1.UserService,
            booking_service_1.BookingService,
            hotel_service_1.HotelService,
            room_service_1.RoomService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map