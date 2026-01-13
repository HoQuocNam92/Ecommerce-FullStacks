import express from "express";
import * as routerController from './role.controller.js'

const router = express.Router();


router.post('/', routerController.createRole)
router.get('/', routerController.getAllRole);
router.put('/:id', routerController.updateRole);
router.delete('/:id', routerController.deleteRole);

export default router;