import { Router } from 'express';
import { bookingController } from './booking.controller';
import { auth } from '../../middleware/auth.middleware';
import { Role } from '../../../generated/prisma/enums';

const router = Router();

router.post('/', auth(Role.CUSTOMER ,Role.ADMIN),  bookingController.addNewBooking);
router.get('/', auth(Role.CUSTOMER ,Role.ADMIN),bookingController.getAllBookings);
router.get('/:id', auth(Role.CUSTOMER ,Role.ADMIN), bookingController.getSingleBooking);

export const bookingRouter = router;
