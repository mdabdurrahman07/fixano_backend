import { UserActiveStatus } from '../../../generated/prisma/enums';
import { prisma } from '../../lib/prisma';
import { ICategoryPayload } from './admin.interface';

const fetchAllUsers = async () => {
  const allUser = await prisma.user.findMany({
    omit: {
      password: true
    },
    include: {
      technician: true
    }
  });
  return allUser;
};
const updateUserStatus = async ({ status }: { status: UserActiveStatus }, userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  if (!user) {
    throw new Error('User not found by this id');
  }

  if (user.status === status) {
    throw new Error(`User status is already ${status}. No database update needed`);
  }

  const updateStatus = await prisma.user.update({
    where: { id: userId },
    data: {
      status: status
    },
    omit: {
      password: true
    },
    include: {
      technician: true
    }
  });
  return updateStatus;
};
const fetchAllBookings = async () => {
  const bookings = await prisma.booking.findMany();
  return bookings;
};
const fetchAllCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};
const createNewCategory = async (payload: ICategoryPayload) => {
  const { name, description, iconUrl } = payload;
  const isCategoryExist = await prisma.category.findUnique({
    where: {
      name: name
    }
  });
  if (isCategoryExist) {
    throw new Error('This Category already exists');
  }
  const createCategory = await prisma.category.create({
    data: {
      name: name,
      description: description,
      iconUrl: iconUrl
    }
  });
  const category = await prisma.category.findUnique({
    where: {
      id: createCategory.id
    },
    include:{
        services: true
    }
  });
  return category;
};

export const adminService = {
  fetchAllUsers,
  updateUserStatus,
  fetchAllBookings,
  fetchAllCategories,
  createNewCategory
};
