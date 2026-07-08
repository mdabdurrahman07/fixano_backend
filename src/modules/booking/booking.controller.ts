import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../util/catchAsync';
import { bookingService } from './booking.service';
import { sendResponse } from '../../util/sendResponse';

const addNewBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id as string;
  const payload = req.body;

  const result = await bookingService.createNewBooking(payload, userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking created successfully',
    data: result
  });
});
const getAllBookings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});
const getSingleBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const bookingController = {
  addNewBooking,
  getAllBookings,
  getSingleBooking
};
