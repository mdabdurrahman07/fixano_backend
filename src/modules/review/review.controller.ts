import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../util/catchAsync';
import { reviewService } from './review.service';
import { sendResponse } from '../../util/sendResponse';

const addNewReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  const customerId = req.user?.id as string;

  const result = await reviewService.createReview(payload, customerId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Review created successfully',
    data: result
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const reviewId = req.params.id as string;
  const customerId = req.user?.id as string;
  await reviewService.deleteReview(reviewId, customerId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review deleted'
  });
});

export const reviewController = {
  addNewReview,
  deleteReview
};
