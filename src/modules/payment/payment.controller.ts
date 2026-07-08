import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../util/catchAsync';
import { paymentService } from './payment.service';
import { sendResponse } from '../../util/sendResponse';

const createCheckoutSession = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const customerId = req.user?.id as string;
  const bookingId = req.params.id as string;
  const result = await paymentService.createCheckoutSessionService(customerId, bookingId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Stripe checkout session trigged',
    data: result
  });
});

const handleWebhook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const event = req.body as Buffer;
  const signature = req.headers['stripe-signature']! as string;
  await paymentService.handleWebhookService(event, signature);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'stripe web hook trigged successfully'
  });
});

const getPaymentStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const paymentController = {
  createCheckoutSession,
  handleWebhook,
  getPaymentStatus
};
