import { Response } from 'express';
import { PrismaService } from '../database/database.service';
import { HelpersService } from '../helpers/helpers.service';
import { UpdateBioDto, UpdateCreditCardDto, UpdatePreferencesDto } from './dto';
export declare class UserService {
    private prisma;
    private resHandler;
    constructor(prisma: PrismaService, resHandler: HelpersService.ResponseHandler);
    getUser(userId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getUserById(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    updateUserBio(userId: string, dto: UpdateBioDto, res: Response): Promise<Response<any, Record<string, any>>>;
    updateUserPreferences(userId: string, dto: UpdatePreferencesDto, res: Response): Promise<Response<any, Record<string, any>>>;
    updateUserCreditCardInfo(userId: string, dto: UpdateCreditCardDto, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteUser(userId: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
