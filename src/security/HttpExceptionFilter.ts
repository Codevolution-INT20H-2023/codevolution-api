import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";

export type ServiceExceptionPayload = {
  message: string;
  details?: string[];
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    let status, message;

    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse();

      status = exception.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR;

      message =
        typeof errorResponse === 'string'
          ? errorResponse
          : (errorResponse as any).message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal Server Error';
    }

    const requestResponse = {
      status,
      timestamp: new Date().toISOString(),
      ...(typeof message === 'object' ? message : { message }),
    };

    res.status(status).json(requestResponse);

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {

      console.log(exception.stack);
    }
  }
}