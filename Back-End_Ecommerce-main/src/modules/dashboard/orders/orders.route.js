import express from "express";
const router = express.Router();


import * as ordersController from "./orders.controllers.js";

router.get("/", ordersController.getOrdersController);
router.get("/:orderId", ordersController.getOrderDetails);
router.put("/update-status-order", ordersController.updateStatusOrder);

export default router;