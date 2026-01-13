import express from "express";

import * as shipperController from './shipper.controllers.js'

const router = express.Router()


router.get('/', shipperController.getAllShippingMethod)

export default router