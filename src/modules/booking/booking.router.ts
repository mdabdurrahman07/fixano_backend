import { Router } from 'express';
import { bookingController } from './booking.controller';

const router = Router();

router.post('/bookings', bookingController.addNewBooking);
router.get('/bookings', bookingController.getAllBookings);
router.get('/bookings/:id', bookingController.getSingleBooking);

export const bookingRouter = router;
