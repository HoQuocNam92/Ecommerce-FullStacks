import * as PaymentService from './payment.services.js';
import { success } from '../../shared/utils/response.js';

export const getAllPayments = async (req, res, next) => {
    try {
        const payments = await PaymentService.getPayments();
        return success(res, payments, "Lấy danh sách thanh toán thành công");
    } catch (error) {
        next(error);
    }
};

export const getPaymentById = async (req, res, next) => {
    try {
        const payment = await PaymentService.getPaymentById(req.params.id);
        return success(res, payment, "Lấy thông tin thanh toán thành công");
    } catch (error) {
        next(error);
    }
};

export const createPayment = async (req, res, next) => {
    try {
        const payment = await PaymentService.createPayment(req.body);
        return success(res, payment, "Tạo thanh toán thành công", 201);
    } catch (error) {
        next(error);
    }
};

export const processPayment = async (req, res, next) => {
    try {
        const { orderId, paymentMethod, paymentData } = req.body;
        const result = await PaymentService.processPayment(orderId, paymentMethod, paymentData);
        return success(res, result, "Xử lý thanh toán thành công");
    } catch (error) {
        next(error);
    }
};

export const updatePayment = async (req, res, next) => {
    try {
        await PaymentService.updatePayment(req.params.id, req.body);
        return success(res, null, "Cập nhật thanh toán thành công");
    } catch (error) {
        next(error);
    }
};

export const cancelPayment = async (req, res, next) => {
    try {
        await PaymentService.cancelPayment(req.params.id);
        return success(res, null, "Hủy thanh toán thành công");
    } catch (error) {
        next(error);
    }
};

export const getPaymentMethods = async (req, res, next) => {
    try {
        const methods = await PaymentService.getPaymentMethods();
        return success(res, methods, "Lấy danh sách phương thức thanh toán thành công");
    } catch (error) {
        next(error);
    }
};
