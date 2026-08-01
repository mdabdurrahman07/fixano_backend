import { Router } from 'express';
import { auth } from '../../middleware/auth.middleware';
import { Role } from '../../../generated/prisma/enums';
import { reviewController } from './review.controller';

const router = Router();

router.post('/', auth(Role.CUSTOMER, Role.ADMIN), reviewController.addNewReview);
router.delete('/:id', auth(Role.CUSTOMER, Role.ADMIN), reviewController.deleteReview);
router.get('/:id', auth(Role.CUSTOMER, Role.ADMIN, Role.TECHNICIAN), reviewController.getAllReview )

export const reviewRoute = router;
