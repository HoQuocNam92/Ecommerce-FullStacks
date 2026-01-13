import express from "express";
import * as OverviewController from './overview.controller.js'

const router = express.Router()


router.get('/', OverviewController.getOverviewByYear)

export default router;