import * as CartItemRepo from './cart.repositories.js';
import * as OrderService from '../order/order/order.services.js';
import * as PaymentService from '../payment/payment.services.js';

export const getCartItems = () => CartItemRepo.getAllCartItems();

export const getCartItemsByUser = async (user_id) => {
    const Cart = await CartItemRepo.getCartByUser(user_id);

    Cart.forEach(e => {
        if (e.thumbnail) {
            e.thumbnail = JSON.parse(e.thumbnail)[0]?.url
        }
    });
    return Cart;
};

export const addCartItem = async (data) => {
    let Cart;
    const { product_id, user_id } = data;
    if (await CartItemRepo.findCartByProductID(product_id, user_id)) {
        Cart = await CartItemRepo.updateCartQuantity(data)
    }
    else {
        Cart = await CartItemRepo.addCart(data)
    };

    Cart.forEach(e => {
        if (e.thumbnail) {
            e.thumbnail = JSON.parse(e.thumbnail)[0]?.url
        }
    });
    return Cart;
};

export const updateCartItem = async (data) => {
    let Cart = await CartItemRepo.UpdateCart(data)
    Cart.forEach(e => {
        if (e.thumbnail) {
            e.thumbnail = JSON.parse(e.thumbnail)[0]?.url
        }
    });
    return Cart;
};

export const deleteCartItem = (id) => CartItemRepo.deleteCart(id);

export const clearCart = async (user_id) => {
    return await CartItemRepo.clearUserCart(user_id);
};

export const getCartSummary = async (user_id) => {
    const cartItems = await getCartItemsByUser(user_id);

    const summary = {
        totalItems: cartItems.length,
        totalQuantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        totalAmount: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        items: cartItems
    };

    return summary;
};

export const checkoutCart = async (user_id, checkoutData) => {
    try {

        const products = JSON.stringify(checkoutData.map(x => ({ product_id: x.product_id, quantity: x.quantity }) || []))
        const Cart = await CartItemRepo.checkoutCart(products, user_id);
        return Cart
    } catch (error) {
        throw new Error(`Lỗi checkout: ${error.message}`);
    }
};