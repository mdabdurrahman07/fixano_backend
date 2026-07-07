import { prisma } from '../../lib/prisma';
import { IServicePayload } from './technician.interface';

const createService = async (payload: IServicePayload, userId: string) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const { title, description, price, durationMinutes, categoryId } = payload;
    const user = await tx.user.findUnique({
      where:{
        id: userId
      },
      include:{
        technician: true
      }
    })
    if(!user?.technician?.id){
      throw new Error('Only technicians can create services')
    }
    const technicianId = user?.technician?.id
    const category = await tx.category.findUnique({
      where: {
        id: categoryId
      }
    });
    if (!category) {
      throw new Error('No category found by this id');
    }
    const createService = await tx.service.create({
      data: {
        title,
        description,
        price,
        durationMinutes,
        categoryId,
        technicianId
      },
      include:{
        category: true
      }
    });
    return createService
  });
  return transactionResult;
};
const putTechnicianProfile = async () => {};
const putTechnicianAvailability = async () => {};
const getTechnicianBookings = async () => {};
const patchTechnicianBooking = async () => {};

export const technicianService = {
  createService,
  putTechnicianProfile,
  putTechnicianAvailability,
  getTechnicianBookings,
  patchTechnicianBooking
};
