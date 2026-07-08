import { prisma } from '../../lib/prisma';
import { ICreateBookingPayload } from './booking.interface';

const createNewBooking = async (payload: ICreateBookingPayload, userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  if (!user) {
    throw new Error('User not found');
  }
  const technician = await prisma.technician.findUnique({
    where: {
      id: payload.technicianId
    }
  });
  if (!technician) {
    throw new Error('Technician not found');
  }
  const service = await prisma.service.findFirst({
    where: {
      id: payload.serviceId,
      technicianId: payload.technicianId,
      isActive: true
    }
  });
  if (!service) {
    throw new Error("service didn't match for this technician try other technician");
  }
  const isExistBooking = await prisma.booking.findFirst({
    where: {
      technicianId: payload.technicianId,
      scheduledAt: payload.scheduledAt,
      status: {
        in: ['ACCEPTED', 'IN_PROGRESS']
      }
    }
  });
  if (isExistBooking) {
    throw new Error('Technician is unavailable for the selected time');
  }
  const booking = await prisma.booking.create({
    data: {
      customerId: userId,
      technicianId: payload.technicianId,
      serviceId: payload.serviceId,
      scheduledAt: payload.scheduledAt,
      address: payload.address,
      notes: payload.notes,
      totalAmount: service.price
    }
  });
  return booking;
};
const fetchAllBookings = async (userId: string) => {
  const result = await prisma.booking.findMany({
    where: {
      customerId: userId
    },
    include: {
      technician: true,
      customer: {
        omit: {
          password: true
        }
      },
      service: true,
      reviews: true
    }
  });

  return result;
};
const fetchSingleBooking = async (bookingId: string, userId: string) => {
  const result = await prisma.booking.findMany({
    where: {
      customerId: userId,
      id: bookingId
    },
    include: {
      technician: true,
      customer: {
        omit: {
          password: true
        }
      },
      service: true,
      reviews: true
    }
  });
  return result;
};

export const bookingService = {
  createNewBooking,
  fetchAllBookings,
  fetchSingleBooking
};
