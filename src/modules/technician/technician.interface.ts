export interface IServicePayload {
    title: string,
    description: string,
    price: number,
    durationMinutes: number,
    categoryId: string
}

export interface IUpdateTechnicianPayload {
  bio?: string | null;
  yearsExperience?: number;
  hourlyRate?: number | string; 
}

export interface IAvailabilityPayload {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}