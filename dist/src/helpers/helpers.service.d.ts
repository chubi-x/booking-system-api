import { Response } from 'express';
export declare class HelpersService {
    resHandler: HelpersService.ResponseHandler;
    constructor(resHandler: HelpersService.ResponseHandler);
}
export declare namespace HelpersService {
    class ResponseHandler {
        private DEFAULT_SERVER_ERROR;
        private DEFAULT_SUCCESS_MESSAGE;
        private DEFAULT_CLIENT_ERROR_STATUS_CODE;
        private DEFAULT_SUCCESS_STATUS_CODE;
        serverError(res: Response, message?: string): Response;
        clientError(res: Response, message: string | object, status?: number): Response;
        requestSuccessful({ res, payload, message, status, }: {
            res: Response;
            payload?: any;
            message?: string;
            status?: number;
        }): Response<any, Record<string, any>>;
    }
}
