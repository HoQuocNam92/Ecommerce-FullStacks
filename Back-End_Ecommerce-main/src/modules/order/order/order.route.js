import express from 'express';
import * as OrderController from './order.controllers.js';
import * as OrderService from './order.services.js';
import xlsx from 'xlsx';
import authentication from '../../../shared/middlewares/Auth/authentication.js';

const router = express.Router();

// Public routes
router.use(authentication);
router.get('/', OrderController.getAllOrders);

router.post('/', OrderController.createOrder);


router.get('/recents', OrderController.getRecentOrders);
router.get('/user', OrderController.getOrderById);


router.get('/order-details/:order_id', OrderController.getOrderDetails);



export default router;