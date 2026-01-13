import express from "express";
import * as  bannerControllers from './banner.controllers.js'
import upload from "#src/shared/middlewares/upload.middlware.js";

const route = express.Router();


route.post('/', upload.fields([{ name: 'image', maxCount: 1 }]), bannerControllers.createBanner)

route.get('/', bannerControllers.getAllBanner)

route.put('/', upload.fields([{ name: 'image_new', maxCount: 1 }]), bannerControllers.updateBanner)

route.delete('/:id', bannerControllers.deleteBanner)





export default route;