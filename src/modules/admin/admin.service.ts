import { UserActiveStatus } from '../../../generated/prisma/enums';
import { prisma } from '../../lib/prisma';

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
const updateUserStatus = async ({status}: {status: UserActiveStatus}, userId: string) => {
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
const fetchAllBookings = async () => {};
const fetchAllCategories = async () => {};
const createNewCategory = async () => {};

export const adminService = {
  fetchAllUsers,
  updateUserStatus,
  fetchAllBookings,
  fetchAllCategories,
  createNewCategory
};
