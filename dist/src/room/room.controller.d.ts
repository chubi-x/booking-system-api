import { Response } from 'express';
import { RoomService } from './room.service';
import { NewRoomDto, UpdateRoomDto } from './dto';
export declare class RoomController {
    private roomService;
    constructor(roomService: RoomService);
    newRoom(hotelId: string, dto: NewRoomDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getRoomsByHotel(hotelId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllRooms(res: Response): Promise<Response<any, Record<string, any>>>;
    getRoomById(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    updateRoomById(dto: UpdateRoomDto, id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteRoomById(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
