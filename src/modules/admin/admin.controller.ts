import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../util/catchAsync';

const getAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

const patchUserStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

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
