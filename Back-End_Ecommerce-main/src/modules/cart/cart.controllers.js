import { success } from '../../shared/utils/response.js';
import * as CartItemService from './cart.services.js';

export const getAllCartItems = async (req, res, next) => {
    try {
        const carts = await CartItemService.getCartItems();
        return success(res, carts, "Lấy danh sách giỏ hàng thành công")
    } catch (error) {
        next(error)
    }
};

export const getCartItemById = async (req, res, next) => {
    try {
        const cart = await CartItemService.getCartItemsByUser(req.params.user_id);
        return success(res, cart, "Lấy danh sách giỏ hàng thành công")
    } catch (error) {
        next(error)
    }
};

export const getCartSummary = async (req, res, next) => {
    try {
        const summary = await CartItemService.getCartSummary(req.user.id);
        return success(res, summary, "Lấy tóm tắt giỏ hàng thành công");
    } catch (error) {
        next(error);
    }
};

export const createCartItem = async (req, res, next) => {
    try {
        const cart = await CartItemService.addCartItem(req.body);
        return success(res, cart, "Thêm sản phẩm vào giỏ hàng thành công")
    } catch (error) {
        next(error)
    }
};

export const updateCartItem = async (req, res, next) => {
    try {
        await CartItemService.updateCartItem(req.body);
        return success(res, "Cập nhật giỏ hàng thành công")
    } catch (error) {
        next(error)
    }
};

export const deleteCartItem = async (req, res, next) => {
    try {
        await CartItemService.deleteCartItem(req.params.id);
        return success(res, "Xóa sản phẩm giỏ hàng thành công")
    } catch (error) {
        next(error)
    }
};

export const clearCart = async (req, res, next) => {
    try {
        await CartItemService.clearCart(req.user.id);
        return success(res, "Xóa giỏ hàng thành công");
    } catch (error) {
        next(error);
    }
};

export const checkoutCart = async (req, res, next) => {
    try {
        const result = await CartItemService.checkoutCart(req.user.id, req.body.products);
        return success(res, result, "Checkout giỏ hàng thành công");
    } catch (error) {
        next(error);
    }
};
