import express from 'express';
import * as RevenueController from './revenue.controllers.js';
const router = express.Router();




router.get('/total-revenue', RevenueController.getTotalRevenue);
router.get('/monthly-revenue', RevenueController.getMonthlyRevenue);
router.get('/products-hot', RevenueController.getRevenueProducts);
export default router;