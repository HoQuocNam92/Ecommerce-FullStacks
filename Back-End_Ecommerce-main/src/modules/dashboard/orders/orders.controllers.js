import * as orderServices from './orders.services.js';
import { success } from '#utils/response.js';
const size = 20;

export const getOrdersController = async (req, res, next) => {

    try {
        const orders = await orderServices.fetchAllOrders(req.query.page || 1, size);
        return success(res, orders, "Orders fetched successfully");
    } catch (error) {
        next(error);
    }
}


export const getOrderDetails = async (req, res, next) => {

    try {
        const orders = await orderServices.getOrderDetails(req.params.orderId);
        return success(res, orders, "Giỏ hàng chi tiết lấy thành công");
    } catch (error) {
        next(error);
    }
}



export const updateStatusOrder = async (req, res, next) => {
    try {
        const orders = await orderServices.updateStatusOrder(req.body);
        return success(res, orders, "Đơn hàng cập nhật trạng thái thành công");
    } catch (error) {
        next(error);
    }
}