import { prisma } from '../../lib/prisma';
import { IAvailabilityPayload, IServicePayload, IUpdateTechnicianPayload } from './technician.interface';

const createService = async (payload: IServicePayload, userId: string) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const { title, description, price, durationMinutes, categoryId } = payload;
    const user = await tx.user.findUnique({
      where: {
        id: userId
      },
      include: {
        technician: true
      }
    });
    if (!user?.technician?.id) {
      throw new Error('Only technicians can create services');
    }
    const technicianId = user?.technician?.id;
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
      include: {
        category: true
      }
    });
    return createService;
  });
  return transactionResult;
};
const putTechnicianProfile = async (payload: IUpdateTechnicianPayload, userId: string) => {
  const { bio, hourlyRate, yearsExperience } = payload;
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    include: {
      technician: true
    }
  });

  const technicianId = user?.technician?.id;
  if (!technicianId) {
    throw new Error('no technician found by this id');
  }

  const updateTechnicianProfile = await prisma.technician.update({
    where: {
      id: technicianId
    },
    data: {
      bio: bio,
      hourlyRate: hourlyRate,
      yearsExperience: yearsExperience
    }
  });
  return updateTechnicianProfile;
};
const putTechnicianAvailability = async (payload: IAvailabilityPayload, userId: string) => {
  console.log(payload);
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    include: {
      technician: true
    }
  });

  const technicianId = user?.technician?.id;
  if (!technicianId) {
    throw new Error('no technician found by this id');
  }
  // if (payload.dayOfWeek < 0 || payload.dayOfWeek > 6) {
  //   throw new Error('dayOfWeek must be between 0 and 6. Where 0 means Sunday and 6 means Saturday');
  // }
  const availability = await prisma.availability.upsert({
    where: {
      technicianId_dayOfWeek: {
        technicianId,
        dayOfWeek: payload.dayOfWeek
      }
    },
    update: {
      startTime: payload.startTime,
      endTime: payload.endTime
    },
    create: {
      technicianId,
      dayOfWeek: payload.dayOfWeek,
      startTime: payload.startTime,
      endTime: payload.endTime
    },
    include: {
      technician: true
    }
  });
  return availability;
};
const getTechnicianBookings = async () => {};
const patchTechnicianBooking = async () => {};

export const technicianService = {
  createService,
  putTechnicianProfile,
  putTechnicianAvailability,
  getTechnicianBookings,
  patchTechnicianBooking
};
