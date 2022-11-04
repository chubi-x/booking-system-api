import { Response } from 'express';
import { UpdateBioDto, UpdateCreditCardDto, UpdatePreferencesDto } from './dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUser(userId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getUserById(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    updateUserBio(userId: string, dto: UpdateBioDto, res: Response): Promise<Response<any, Record<string, any>>>;
    updatePreferences(userId: string, dto: UpdatePreferencesDto, res: Response): Promise<Response<any, Record<string, any>>>;
    updateCreditCard(userId: string, dto: UpdateCreditCardDto, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteUser(userId: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
