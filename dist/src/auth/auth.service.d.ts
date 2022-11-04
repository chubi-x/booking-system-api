import { Request, Response } from 'express';
import { PrismaService } from '../database/database.service';
import { HelpersService } from '../helpers/helpers.service';
import { checkOldPasswordDto, LoginDto, ResetPasswordDto, SignupDto, UpdateEmailDto } from './dto';
export declare class AuthService {
    private prisma;
    private resHandler;
    constructor(prisma: PrismaService, resHandler: HelpersService.ResponseHandler);
    signup(dto: SignupDto, res: Response): Promise<Response<any, Record<string, any>>>;
    login(dto: LoginDto, res: Response, req: Request): Promise<Response<any, Record<string, any>>>;
    verifyAccount(userId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    updateEmail(dto: UpdateEmailDto, userId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    checkOldPassword(dto: checkOldPasswordDto, userId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    resetPassword(dto: ResetPasswordDto, userId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
