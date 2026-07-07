import  httpStatus  from 'http-status';
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../util/catchAsync";
import { serviceService } from "./service.service";
import { sendResponse } from "../../util/sendResponse";

const getAllServices = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await serviceService.fetchAllServices()
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All services retrieved successfully",
        data: result
    })
})

const getAllTechnicians = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await serviceService.fetchAllTechnicians()
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All technician retrieved successfully",
        data: result
    })
})

const getSingleTechnician = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const technicianId = req.params.id as string
    const result = await serviceService.fetchSingleTechnician(technicianId)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Single technician retrieved successfully",
        data: result
    })
})

const getAllCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await serviceService.fetchAllCategories()
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All categories retrieved successfully",
        data: result
    })
})

export const serviceController = {
    getAllServices,
    getAllTechnicians,
    getSingleTechnician,
    getAllCategories
}