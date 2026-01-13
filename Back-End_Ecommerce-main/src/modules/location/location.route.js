import express from 'express';
import * as LocationController from './location.Controller.js';

const router = express.Router();

router.get('/provinces', LocationController.getProvinces);
router.get('/districts/:district', LocationController.getDistricts);
router.get('/wards/:wards', LocationController.getWards);

export default router;


