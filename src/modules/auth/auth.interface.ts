import { Role } from '../../../generated/prisma/enums';

export interface IUserPayload {
  name: string;
  email: string;
  password: string;
  role: Exclude<Role, 'ADMIN'>
  phone?: string;
  avatarUrl?: string;
  bio?: string;
  yearsExperience?: number;
  hourlyRate?: number
}
