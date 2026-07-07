import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../util/catchAsync';
import { adminService } from './admin.service';
import { sendResponse } from '../../util/sendResponse';

const getAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await adminService.fetchAllUsers();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Customer data retrieved successfully',
    data: result
  });
});

const patchUserStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  const id = req.params.id as string
  const result = await adminService.updateUserStatus(payload, id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Customer status active updated',
    data: result
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

const getAllCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

const addNewCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const adminController = {
  getAllUser,
  patchUserStatus,
  getAllBookings,
  getAllCategories,
  addNewCategory
};
