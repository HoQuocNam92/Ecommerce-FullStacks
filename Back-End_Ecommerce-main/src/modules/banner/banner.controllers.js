

import * as bannerSevices from './banner.services.js'
import { success } from '#utils/response.js';
export const createBanner = async (req, res, next) => {
    try {
        const img = req?.files?.image[0]?.path;
        if (!img) {
            throw new Error("Chưa có ảnh")
        }
        const data = await bannerSevices.createBanner({ ...req.body, img });
        return success(res, data, "Tạo banner thành công")
    } catch (error) {
        next(error)
    }
}
export const getAllBanner = async (req, res, next) => {
    try {
        const data = await bannerSevices.getAllBanner(req.query.page || 1);
        return success(res, data, "Tạo banner thành công")
    } catch (error) {
        next(error)
    }
}

export const updateBanner = async (req, res, next) => {
    try {
        const img = req?.files?.image_new[0]?.path;
        const data = await bannerSevices.updateBanner(req.body, img);
        return success(res, data, "Cập nhật banner thành công")
    } catch (error) {
        next(error)
    }
}


export const deleteBanner = async (req, res, next) => {
    try {
        const data = await bannerSevices.deleteBanner(req.params.id);
        return success(res, data, "Tạo banner thành công")
    } catch (error) {
        next(error)
    }
}