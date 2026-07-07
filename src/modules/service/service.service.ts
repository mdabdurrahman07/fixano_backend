import { prisma } from '../../lib/prisma';

const fetchAllServices = async () => {
  const services = await prisma.service.findMany();
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
    include:{
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
    include:{
      services: true
    }
  })
  return categories
};

export const serviceService = {
  fetchAllServices,
  fetchAllTechnicians,
  fetchSingleTechnician,
  fetchAllCategories
};
