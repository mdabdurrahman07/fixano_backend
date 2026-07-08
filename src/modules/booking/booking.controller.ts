import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../util/catchAsync';

const addNewBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});
const getAllBookings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});
const getSingleBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const bookingController = {
  addNewBooking,
  getAllBookings,
  getSingleBooking
};
