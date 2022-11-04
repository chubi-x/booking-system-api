import { BookingService } from './booking.service';
import { Response } from 'express';
import { CreateBookingDto, UpdateBookingDto } from './dto';
export declare class BookingController {
    private bookingService;
    constructor(bookingService: BookingService);
    getBookingById(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllBookingsByUser(userId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    createBooking(userId: string, dto: CreateBookingDto, res: Response): Promise<Response<any, Record<string, any>>>;
    updateBookingById(bookingId: string, userId: string, dto: UpdateBookingDto, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteBookingById(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteAllBookings(userId: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
