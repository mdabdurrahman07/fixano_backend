import { Router } from 'express';

const router = Router();

router.post('/service')
router.put('/profile')
router.put('/availability')
router.get('/bookings')
router.patch('booking/:id')

export const technicianRoute = router;
