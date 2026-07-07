import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../util/catchAsync";

const getAllServices = catchAsync(async (req: Request, res: Response, next: NextFunction) => {})

const getAllTechnicians = catchAsync(async (req: Request, res: Response, next: NextFunction) => {})

const getSingleTechnician = catchAsync(async (req: Request, res: Response, next: NextFunction) => {})

const getAllCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {})

export const serviceController = {
    getAllServices,
    getAllTechnicians,
    getSingleTechnician,
    getAllCategories
}