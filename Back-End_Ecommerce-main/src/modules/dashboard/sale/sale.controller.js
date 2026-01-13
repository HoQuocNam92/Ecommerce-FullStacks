import * as ServiceRepo from './sale.service.js';
import { success } from '#utils/response.js';

// GET
export const getProductSale = async (req, res, next) => {
    try {
        const data = await ServiceRepo.getProductSale();
        return success(res, data, "Lấy sản phẩm giảm giá thành công");
    } catch (error) {
        next(error);
    }
};

// CREATE
export const createProductSale = async (req, res, next) => {
    try {
        const data = await ServiceRepo.createProductSale(req.body);
        return success(res, data, "Tạo sản phẩm giảm giá thành công");
    } catch (error) {
        next(error);
    }
};

// UPDATE
export const updateProductSale = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await ServiceRepo.updateProductSale(id, req.body);
        return success(res, data, "Cập nhật sản phẩm giảm giá thành công");
    } catch (error) {
        next(error);
    }
};

// DELETE
export const deleteProductSale = async (req, res, next) => {
    try {
        const { id } = req.params;
        await ServiceRepo.deleteProductSale(id);
        return success(res, null, "Xóa sản phẩm giảm giá thành công");
    } catch (error) {
        next(error);
    }
};
