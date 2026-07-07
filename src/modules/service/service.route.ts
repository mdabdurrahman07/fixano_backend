import { Router } from 'express';
import { serviceController } from './service.controller';

const router = Router();

router.get('/services', serviceController.getAllServices);
router.get('/technicians', serviceController.getAllTechnicians);
router.get('/technicians/:id', serviceController.getSingleTechnician);
router.get('/categories', serviceController.getAllCategories);

export const serviceRoute = router;
