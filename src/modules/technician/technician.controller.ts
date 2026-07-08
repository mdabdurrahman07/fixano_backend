import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../util/catchAsync';
import { technicianService } from './technician.service';
import { sendResponse } from '../../util/sendResponse';

const addService = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  const userId = req.user?.id as string;
  const result = await technicianService.createService(payload, userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Service created successfully',
    data: result
  });
});
const editTechnicianProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id as string;
  const payload = req.body;
  const result = await technicianService.putTechnicianProfile(payload, userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Technician Profile is updated',
    data: result
  });
});
const editTechnicianAvailability = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id as string
  const payload = req.body
  const result  = await technicianService.putTechnicianAvailability(payload, userId)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Technician availability is updated',
    data: result
  });
});
const fetchTechnicianBookings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});
const editTechnicianBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const technicianController = {
  addService,
  editTechnicianProfile,
  editTechnicianAvailability,
  fetchTechnicianBookings,
  editTechnicianBooking
};
