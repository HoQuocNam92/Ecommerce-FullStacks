import CustomerRoute from './customers/customers.route.js';
import RevenueRoute from './revenue/revenue.routes.js';
import OrdersRoute from './orders/orders.route.js';
import EmployeeRoute from './employees/employees.route.js';
import ProductRoute from './products/products.route.js';
import OverviewRoute from './overview/overview.route.js';
import RoleRoute from './roles/role.route.js'
import CouponRoute from './coupon/coupon.route.js'
import SaleRoute from './sale/sale.route.js'
import authentication from '#shared/middlewares/Auth/authentication.js';
import authorization from '#shared/middlewares/Auth/authorization.js';

import express from "express";
const router = express.Router();
router.use('/customers', authentication, authorization, CustomerRoute);
router.use('/revenues', authentication, authorization, RevenueRoute);
router.use('/orders', authentication, authorization, OrdersRoute);
router.use('/employees', authentication, authorization, EmployeeRoute);
router.use('/products', authentication, authorization, ProductRoute);
router.use('/overviews', authentication, authorization, OverviewRoute);
router.use('/roles', authentication, authorization, RoleRoute);
router.use('/coupons', authentication, authorization, CouponRoute);
router.use('/sales', SaleRoute);
export default router;