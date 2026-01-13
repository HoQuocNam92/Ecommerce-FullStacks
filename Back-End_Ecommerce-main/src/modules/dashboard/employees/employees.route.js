import express from 'express';
import * as EmployeeController from './employees.controllers.js';
import { uploadLimiter } from '#config/rate-limit.js';

import upload from '#middlewares/upload.middlware.js';
const router = express.Router();

router.get('/', EmployeeController.getAllEmployees);
router.delete('/:employeeId', EmployeeController.deleteEmployeeById);
router.put('/', upload.fields([{ name: 'avatar', maxCount: 1 }]), EmployeeController.updateEmployee);

router.post('/', upload.fields([{ name: 'avatar', maxCount: 1 }]), EmployeeController.createEmployee)
router.get('/total-pages', EmployeeController.getTotalEmployees);
router.get('/search', EmployeeController.searchEmployees);
export default router;

