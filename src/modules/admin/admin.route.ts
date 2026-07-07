import { Router } from 'express';
import { adminController } from './admin.controller';
import { auth } from '../../middleware/auth.middleware';
import { Role } from '../../../generated/prisma/enums';

const router = Router();

router.get('/users', auth(Role.ADMIN), adminController.getAllUser);
router.patch('/users/:id', auth(Role.ADMIN), adminController.patchUserStatus);
router.get('/bookings', auth(Role.ADMIN), adminController.getAllBookings);
router.get('/categories', auth(Role.ADMIN), adminController.getAllCategories);
router.post('/categories', auth(Role.ADMIN), adminController.addNewCategory);

export const adminRoute = router;
