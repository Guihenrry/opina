import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

export default function exceptionHandling(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'Error',
      message: error.message,
    });
  }

  console.log(error);

  return response
    .status(500)
    .json({ status: 'Error', message: 'Internal server error' });
}
