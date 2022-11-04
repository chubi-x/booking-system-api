import { Response } from 'express';
import { PrismaService } from '../database/database.service';
import { HelpersService } from '../helpers/helpers.service';
import { CreateBookingDto, UpdateBookingDto } from './dto';
export declare class BookingService {
    private prisma;
    private resHandler;
    constructor(prisma: PrismaService, resHandler: HelpersService.ResponseHandler);
    createBooking(userId: string, dto: CreateBookingDto, res: Response): Promise<Response<any, Record<string, any>>>;
    updateBookingById(bookingId: string, userId: string, dto: UpdateBookingDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getBookingById(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllBookingsByUser(userId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteBookingById(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteAllBookings(userId: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
