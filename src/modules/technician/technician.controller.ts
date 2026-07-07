import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../util/catchAsync';

const addService = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});
const editTechnicianProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});
const editTechnicianAvailability = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});
const fetchTechnicianBookings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});
const editTechnicianBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const technicianController = {
  addService,
  editTechnicianProfile,
  editTechnicianAvailability,
  fetchTechnicianBookings,
  editTechnicianBooking
};
