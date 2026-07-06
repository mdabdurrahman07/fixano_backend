import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../util/catchAsync';
import { authService } from './auth.service';
import { sendResponse } from '../../util/sendResponse';
import HttpStatus from 'http-status';

const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  const result = await authService.createUserIntoDB(payload);
  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.CREATED,
    message: `${result?.role === 'TECHNICIAN' ? 'Technician' : 'Customer'} created successfully`,
    data: result
  });
});

const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  const result = await authService.logUser(payload);
  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Login Successful',
    data: result
  });
});

export const authController = {
  registerUser,
  loginUser
};
