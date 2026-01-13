import express from 'express';
import * as AuthController from './auth.controllers.js';
import authenticateToken from '../../shared/middlewares/Auth/authentication.js';
import { authLimiter } from '../../shared/config/rate-limit.js';
const router = express.Router();

router.post('/refresh-token', AuthController.HandleRefreshToken);

router.post('/register', AuthController.Registers);

router.post('/login', AuthController.Login);
router.post('/login-google', authLimiter, AuthController.LoginGoogle);


router.post('/logout', AuthController.Logout);
router.post('/forgot-password', AuthController.ForgotPassword);
router.post('/verify-password/:token', AuthController.verifyResetToken);

router.post('/reset-password/:token', AuthController.ResetPassword);

export default router;