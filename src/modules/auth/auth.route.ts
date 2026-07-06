import { Router } from 'express';
import { authController } from './auth.controller';
import { auth } from '../../middleware/auth.middleware';
import { Role } from '../../../generated/prisma/enums';

const router = Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/me', auth(Role.CUSTOMER, Role.TECHNICIAN, Role.ADMIN), authController.getCurrentUser);
router.post('/refreshToken', authController.refreshToken);

export const authRouter = router;
