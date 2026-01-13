import express from 'express';
import * as NotificationController from './notification.controllers.js';
const router = express.Router();

router.get('/user', NotificationController.getAllNotificationsByUser);
router.get('/user/:user_id', NotificationController.getNotificationsByUser);
router.put('/:id/read', NotificationController.markAsRead);

export default router;
