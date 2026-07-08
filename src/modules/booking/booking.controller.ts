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
const getAllBookings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id as string
  const result = await bookingService.fetchAllBookings(userId)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All bookings fetched successfully',
    data: result
  });
});
const getSingleBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const bookingId = req.params.id as string
  const userId = req.user?.id as string
  const result = await bookingService.fetchSingleBooking(bookingId, userId)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Single bookings fetched successfully',
    data: result
  });

});

export const bookingController = {
  addNewBooking,
  getAllBookings,
  getSingleBooking
};
