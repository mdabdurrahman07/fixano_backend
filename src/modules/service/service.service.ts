import { ServiceWhereInput, TechnicianWhereInput } from '../../../generated/prisma/models';
import { prisma } from '../../lib/prisma';
import { IServiceQuery, ITechnicianQuery } from './service.interface';

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
    where: {
      AND: andConditions
    },
    orderBy: {
      [sortby]: sortOrder
    },
    include: {
      category: true,
      technician: true
    }
  });
  return services;
};
const fetchAllTechnicians = async (query: ITechnicianQuery) => {
  const sortby = query.sortby ? query.sortby : 'createdAt';
  const sortOrder = query.sortOrder ? query.sortOrder : 'desc';
  const andConditions: TechnicianWhereInput[] = [];
  if (query.searchTerm) {
    andConditions.push({
      bio: {
        contains: query.searchTerm,
        mode: 'insensitive'
      }
    });
  }
  if (query.hourlyRate) {
    andConditions.push({
      hourlyRate: query.hourlyRate
    });
  }
  if (query.avgRating) {
    andConditions.push({
      avgRating: Number(query.avgRating)
    });
  }
  if (query.yearsExperience) {
    andConditions.push({
      yearsExperience: Number(query.yearsExperience)
    });
  }
  const technicians = await prisma.technician.findMany({
    where: {
      AND: andConditions
    },
    orderBy: {
      [sortby]: sortOrder
    },
    include: {
      reviews: true,
      availabilities: true,
      services: true
    }
  });
  return technicians;
};
const fetchSingleTechnician = async (technicianId: string) => {
  const technician = await prisma.technician.findUnique({
    where: {
      id: technicianId
    },
    include: {
      reviews: true,
      availabilities: true,
      services: true
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
