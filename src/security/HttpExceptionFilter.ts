import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { ValidationError } from "class-validator";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    let status, message, error;
    let details = [];

    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse();

      if (exception instanceof InvalidBodyException) {
        details = getBodyErrors(errorResponse as ValidationError[]);
      }

      error = exception.constructor.name;
      status = exception.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR;

      message =
        typeof errorResponse === 'string'
          ? errorResponse
          : (errorResponse as any).message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal Server Error';
      error = 'InternalServerError';
    }

    const requestResponse = {
      status,
      error,
      timestamp: new Date().toISOString(),
      details,
      ...(typeof message === 'object' ? message : { message }),
    };

    res.status(status).json(requestResponse);

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {

      console.log(exception.stack);
    }
  }
}

export class InvalidBodyException extends HttpException {
  constructor(errors) {
    super(errors, HttpStatus.BAD_REQUEST);
  }
}

export function validateErrors(errors: ValidationError[]) {
  return new InvalidBodyException(errors);
}

export function getBodyErrors(responses: ValidationError[]) {
  const results = [];

  for (const response of responses) {
    results.push(...(response.constraints ? (Object.values(response.constraints)) : getBodyErrors(response.children)));
  }

  return results;
}