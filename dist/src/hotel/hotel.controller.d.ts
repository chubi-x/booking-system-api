import { LoginHotelDto, RegisterHotelDto, UpdateHotelDto } from './dto';
import { HotelService } from './hotel.service';
import { Request, Response } from 'express';
import { checkOldPasswordDto, ResetPasswordDto } from '../auth/dto';
export declare class HotelController {
    private hotelService;
    constructor(hotelService: HotelService);
    getHotel(hotelId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllHotelRooms(hotelId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllHotelBookings(hotelId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllHotels(res: Response): Promise<Response<any, Record<string, any>>>;
    getHotelById(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    registerHotel(dto: RegisterHotelDto, res: Response): Promise<Response<any, Record<string, any>>>;
    loginHotel(dto: LoginHotelDto, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateHotelDetails(hotelId: string, dto: UpdateHotelDto, res: Response): Promise<Response<any, Record<string, any>>>;
    checkOldPassword(dto: checkOldPasswordDto, hotelId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    resetPassword(dto: ResetPasswordDto, hotelId: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
