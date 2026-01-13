import express from 'express';
import * as CustomerController from './customers.controllers.js';

const router = express.Router();

router.get('/', CustomerController.getAllCustomers);
router.delete('/:customerId', CustomerController.deleteCustomerById);
router.put('/:customerId/status', CustomerController.updateCustomerStatus);
router.get('/total-pages', CustomerController.getTotalCustomers);
router.get('/search', CustomerController.searchCustomers);
export default router;

