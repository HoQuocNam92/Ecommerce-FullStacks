// order.controllers.js - Enhanced version
import * as OrderService from './order.services.js';
import { success } from '../../../shared/utils/response.js';

export const getAllOrders = async (req, res, next) => {
    try {
        const pageNumber = req?.query?.pageNumber;
        const orders = await OrderService.getOrders(pageNumber);
        return success(res, orders, "Lấy danh sách đơn hàng thành công");
    } catch (error) {
        next(error);
    }
};

export const getOrderDetails = async (req, res, next) => {
    try {
        const orderId = req.params.order_id;
        const user_id = req.user?.id;
        const orderDetails = await OrderService.getOrderDetails(user_id, orderId);
        return success(res, orderDetails, "Lấy chi tiết đơn hàng thành công");
    } catch (error) {
        next(error);
    }
};
export const getRecentOrders = async (req, res, next) => {
    try {
        const orders = await OrderService.getRecentOrders();
        return success(res, orders, "Lấy danh sách đơn hàng gần đây thành công");
    } catch (error) {
        next(error);
    }
}
export const getOrderById = async (req, res, next) => {
    try {
        const order = await OrderService.getOrderById(req.user?.id);

        return success(res, order, "Lấy danh sách đơn hàng thành công");
    } catch (error) {
        next(error);
    }
};

export const getUserOrders = async (req, res, next) => {
    try {
        const orders = await OrderService.getUserOrders(req.user.id, req.query);
        return success(res, orders, "Lấy đơn hàng của người dùng thành công");
    } catch (error) {
        next(error);
    }
};

export const createOrder = async (req, res, next) => {
    try {
        console.log("Check req?.user.id", req?.user.id)
        const Platform = req.useragent.isMobile ? 'Mobile' : "Desktop";
        let productsArray = req.body.products;
        if (productsArray && !Array.isArray(productsArray)) {
            productsArray = Object.values(productsArray);
        }
        const order = await OrderService.createOrder({
            ...req.body,
            user_id: req?.user.id,
            products: productsArray,
            platform: Platform
        });
        return success(res, order, "Tạo đơn hàng thành công", 201);
    } catch (error) {
        next(error);
    }
};

export const updateOrder = async (req, res, next) => {
    try {
        await OrderService.updateOrder(req.params.id, req.body);
        return success(res, null, "Cập nhật đơn hàng thành công");
    } catch (error) {
        next(error);
    }
};

export const cancelOrder = async (req, res, next) => {
    try {
        await OrderService.cancelOrder(req.params.id, req.user.id);
        return success(res, null, "Hủy đơn hàng thành công");
    } catch (error) {
        next(error);
    }
};

export const updateOrderStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        await OrderService.updateOrderStatus(req.params.id, status);
        return success(res, null, "Cập nhật trạng thái đơn hàng thành công");
    } catch (error) {
        next(error);
    }
};

export const getOrderTracking = async (req, res, next) => {
    try {
        const tracking = await OrderService.getOrderTracking(req.params.id);
        return success(res, tracking, "Lấy thông tin theo dõi đơn hàng thành công");
    } catch (error) {
        next(error);
    }
};

export const deleteOrder = async (req, res, next) => {
    try {
        await OrderService.deleteOrder(req.params.id, req.body);
        return success(res, null, "Xóa đơn hàng thành công");
    } catch (error) {
        next(error);
    }
};