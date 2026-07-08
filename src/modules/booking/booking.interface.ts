export interface ICreateBookingPayload {
  technicianId: string;
  serviceId: string;
  scheduledAt: Date;
  address: string;
  notes?: string;
}