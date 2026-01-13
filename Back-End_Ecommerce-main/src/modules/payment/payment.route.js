import express from 'express';
import * as PaymentController from './payment.controllers.js';
// import { authenticateToken } from '../../shared/middlewares/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/methods', PaymentController.getPaymentMethods);

// Protected routes
// router.use(authenticateToken);

router.get('/', PaymentController.getAllPayments);
router.get('/:id', PaymentController.getPaymentById);
router.post('/', PaymentController.createPayment);
router.post('/process', PaymentController.processPayment);
router.put('/:id', PaymentController.updatePayment);
router.put('/:id/cancel', PaymentController.cancelPayment);

export default router;
