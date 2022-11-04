import { Response } from 'express';
import { PrismaService } from '../database/database.service';
import { HelpersService } from '../helpers/helpers.service';
import { NewRoomDto, UpdateRoomDto } from './dto';
export declare class RoomService {
    private prisma;
    private resHandler;
    constructor(prisma: PrismaService, resHandler: HelpersService.ResponseHandler);
    newRoom(hotelId: string, dto: NewRoomDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getRoomsByHotel(hotelId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllRooms(res: Response): Promise<Response<any, Record<string, any>>>;
    getRoomById(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    updateRoomById(dto: UpdateRoomDto, id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteRoomById(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
