import express from 'express';
import * as SettingController from './setting.controllers.js';
const router = express.Router();

router.get('/', SettingController.getAllSettings);
router.put('/:key', SettingController.updateSetting);

export default router;