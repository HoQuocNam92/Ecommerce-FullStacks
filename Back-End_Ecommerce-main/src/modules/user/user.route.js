import express from 'express';
import * as UserController from './user.controllers.js';
import authenticateToken from '../../shared/middlewares/Auth/authentication.js';
import upload from '../../shared/middlewares/upload.middlware.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/profile', UserController.getProfile);
router.put('/profile', upload.fields([{ name: 'avatar', maxCount: 1 }]), UserController.updateProfile);

router.post('/avatar', UserController.uploadAvatar);

router.delete('/account', UserController.deleteAccount);

router.put('/settings', UserController.updateUserSettings);


export default router;
