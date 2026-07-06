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
    message: `${result?.role === 'TECHNICIAN' ? 'Technician' : 'Customer'} registration successful`,
    data: result
  });
});

const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  const { accessToken, refreshToken } = await authService.logUser(payload);
  // ? accessToken and refreshToken setup

  // accessToken
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 // 1D
  });
  // refreshToken
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7D
  });

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Login successful',
    data: { accessToken, refreshToken }
  });
});

const getCurrentUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id as string;
  const result = await authService.currentUser(userId);
  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'User info retrieved successfully',
    data: result
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken as string;
  const { accessToken } = await authService.refreshUserToken(refreshToken);
  // accessToken
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 // 1D
  });
  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Token refreshed successfully',
    data: { accessToken }
  });
});

export const authController = {
  registerUser,
  loginUser,
  getCurrentUser,
  refreshToken
};
