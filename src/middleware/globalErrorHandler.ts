import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
export const globalErrorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    message: (err as Error).message,
    error: (err as Error).stack
  });
  next()
};
