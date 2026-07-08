import { Router } from 'express';
import { auth } from '../../middleware/auth.middleware';
import { Role } from '../../../generated/prisma/enums';
import { technicianController } from './technician.controller';

const router = Router();

router.post('/service', auth(Role.TECHNICIAN, Role.ADMIN), technicianController.addService);
router.put('/profile', auth(Role.TECHNICIAN, Role.ADMIN), technicianController.editTechnicianProfile);
router.put('/availability', auth(Role.TECHNICIAN, Role.ADMIN), technicianController.editTechnicianAvailability);
router.get('/bookings', auth(Role.TECHNICIAN, Role.ADMIN), technicianController.fetchTechnicianBookings);
router.patch('/bookings/:id', auth(Role.TECHNICIAN, Role.ADMIN), technicianController.editTechnicianBooking);

export const technicianRoute = router;
