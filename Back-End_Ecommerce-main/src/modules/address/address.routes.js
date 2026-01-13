import express from 'express';
import * as AddressController from './address.controllers.js';
import authenticateToken from '../../shared/middlewares/Auth/authentication.js';

const router = express.Router();

router.get('/', authenticateToken, AddressController.getAddress);
router.post('/', authenticateToken, AddressController.addAddress);
router.put('/', authenticateToken, AddressController.updateAddress);
router.delete('/:id', authenticateToken, AddressController.deleteAddress);

// router.get('/', AddressController.getAddress);
// router.post('/', AddressController.addAddress);

export default router;
