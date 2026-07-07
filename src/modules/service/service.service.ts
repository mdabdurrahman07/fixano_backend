import { ServiceWhereInput } from '../../../generated/prisma/models';
import { prisma } from '../../lib/prisma';
import { IServiceQuery } from './service.interface';

const fetchAllServices = async (query: IServiceQuery) => {
  const sortby = query.sortby ? query.sortby : 'createdAt';
  const sortOrder = query.sortOrder ? query.sortOrder : 'desc';
  const andConditions: ServiceWhereInput[] = [];
  if (query.searchTerm) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.searchTerm,
            mode: 'insensitive'
          }
        },
        {
          description: {
            contains: query.searchTerm,
            mode: 'insensitive'
          }
        }
      ]
    });
  }
  if (query.title) {
    andConditions.push({
      title: query.title
    });
  }
  if (query.description) {
    andConditions.push({
      description: query.description
    });
  }
  if (query.price) {
    andConditions.push({
      price: Number(query.price)
    });
  }
  if (query.technicianId) {
    andConditions.push({
      technicianId: query.technicianId
    });
  }
  if (query.isActive) {
    andConditions.push({
      isActive: query.isActive
    });
  }
  const services = await prisma.service.findMany({
    where:{
      AND: andConditions
    },
    orderBy:{
      [sortby]: sortOrder
    },
    include:{
      bookings: true,
      category: true,
      technician: true
    }
  });
  return services;
};
const fetchAllTechnicians = async () => {
  const technicians = await prisma.technician.findMany();
  return technicians;
};
const fetchSingleTechnician = async (technicianId: string) => {
  const technician = await prisma.technician.findUnique({
    where: {
      id: technicianId
    },
    include: {
      reviews: true
    }
  });
  if (!technician) {
    throw new Error('No technician found by this id');
  }
  return technician;
};
const fetchAllCategories = async () => {
  const categories = await prisma.category.findMany({
    include: {
      services: true
    }
  });
  return categories;
};

export const serviceService = {
  fetchAllServices,
  fetchAllTechnicians,
  fetchSingleTechnician,
  fetchAllCategories
};
