import { Request, Response } from 'express';
import { PrismaService } from '../database/database.service';
import { HelpersService } from '../helpers/helpers.service';
import { LoginHotelDto, RegisterHotelDto, UpdateHotelDto } from './dto';
import { checkOldPasswordDto, ResetPasswordDto } from '../auth/dto';
export declare class HotelService {
    private prisma;
    private resHandler;
    constructor(prisma: PrismaService, resHandler: HelpersService.ResponseHandler);
    registerHotel(dto: RegisterHotelDto, res: Response): Promise<Response<any, Record<string, any>>>;
    loginHotel(dto: LoginHotelDto, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getHotel(hotelId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getHotelById(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllHotelRooms(hotelId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllHotelBookings(hotelId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllHotels(res: Response): Promise<Response<any, Record<string, any>>>;
    updateHotelDetails(hotelId: string, dto: UpdateHotelDto, res: Response): Promise<Response<any, Record<string, any>>>;
    checkOldPassword(dto: checkOldPasswordDto, hotelId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    resetPassword(dto: ResetPasswordDto, hotelId: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
