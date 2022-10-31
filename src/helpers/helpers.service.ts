import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class HelpersService {
  constructor(public resHandler: HelpersService.ResponseHandler) {}
}

export namespace HelpersService {
  /**
   * @class ResponseHandler
   * @description class representing the response handler methods
   */
  export class ResponseHandler {
    private DEFAULT_SERVER_ERROR = 'Internal server error.';
    private DEFAULT_SUCCESS_MESSAGE = 'Request successful.';
    private DEFAULT_CLIENT_ERROR_STATUS_CODE = 400;
    private DEFAULT_SUCCESS_STATUS_CODE = 200;

    /**
     * A method used to send server errors
     * @param {object} res - The HTTP response object.
     * @param {String} message - The error message you want to set.
     * @returns {object} res - The response object.
     */
    serverError(res: Response, message?: string): Response {
      return res.status(500).json({
        success: false,
        error: message ?? this.DEFAULT_SERVER_ERROR,
      });
    }

    /**
       * A method used to send client errors
       * @param {object} res - The HTTP response object.
      //  * @param {String | object} message - The error message you want to set.
       * @param {number} status - The status code of the client error.
       * @returns {object} res - The response object.
       */
    clientError(
      res: Response,
      message: string | object,
      status = this.DEFAULT_CLIENT_ERROR_STATUS_CODE,
    ): Response {
      return res.status(status).json({
        success: false,
        message,
      });
    }

    /**
     * A method used to confirm that a request was successful
     * @param {object} res - HTTP response object
     * @param {object} payload - The data we want to send to the client
     * @param {number} status = The status code of the request.
     * @returns {object} res - The response object.
     */
    requestSuccessful({
      res,
      payload,
      message,
      status = this.DEFAULT_SUCCESS_STATUS_CODE,
    }: {
      res: Response;
      payload?: any;
      message?: string;
      status?: number;
    }) {
      const responseObject = {
        success: true,
        message: message ?? this.DEFAULT_SUCCESS_MESSAGE,
      };
      if (!payload) {
        return res.status(status).send(responseObject);
      }
      return res.status(status).send({ ...responseObject, data: payload });
    }
  }
}
