import { Router } from 'express';
import { paymentController } from './payment.controller';
import { auth } from '../../middleware/auth.middleware';
import { Role } from '../../../generated/prisma/enums';

const router = Router();

router.post('/checkout/:id', auth(Role.CUSTOMER, Role.ADMIN), paymentController.createCheckoutSession);
router.post('/webhook', paymentController.handleWebhook);
router.get('/status/:id', auth(Role.CUSTOMER, Role.ADMIN), paymentController.getPaymentStatus);

export const paymentRoute = router;
