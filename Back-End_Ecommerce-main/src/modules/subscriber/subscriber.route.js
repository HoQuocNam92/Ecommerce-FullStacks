import express from 'express';
import * as SubscriberController from './subscriber.controllers.js';
const router = express.Router();

router.get('/', SubscriberController.getAllSubscribers);
router.post('/', SubscriberController.addSubscriber);

export default router;
