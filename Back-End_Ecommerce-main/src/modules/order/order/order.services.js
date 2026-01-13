import * as OrderRepo from './order.repositories.js';

import * as TelegramService from '../../bot/telegram.service.js';
import { invalidateEntity } from '../../../shared/services/cache.service.js';

export const getOrders = (pageNumber) => OrderRepo.getAllOrders(pageNumber);

export const getOrderById = async (id) => {
    if (!id) {
        throw new Error('Order ID is required');
    }
    let data = await OrderRepo.getOrderById(id);

    for (let i of data) {
        i.items = JSON.parse(i.items)

    }
    return data;
};

export const getOrderDetails = async (user_id, orderId) => {
    if (!orderId) {
        throw new Error('Order ID is required');
    }

    const orderDetails = await OrderRepo.getOrderDetails(user_id, orderId);

    return {
        ...orderDetails,
        items: orderDetails?.items ? JSON.parse(orderDetails.items) : [],
        timeline: orderDetails?.timeline ? JSON.parse(orderDetails.timeline) : [],
        shipping_address: orderDetails?.shipping_address ? JSON.parse(orderDetails.shipping_address) : []
    };
}


export const getRecentOrders = () => OrderRepo.getRecentOrders();

export const getUserOrders = async (userId, filters = {}) => {
    if (!userId) {
        throw new Error('User ID is required');
    }

    const { status, page = 1, limit = 10 } = filters;
    return await OrderRepo.getUserOrders(userId, { status, page, limit });
};

export const createOrder = async (data) => {
    if (!data || Object.keys(data).length === 0) {
        throw new Error('Order data is required');
    }
    try {



        const productsJSON = JSON.stringify(
            data.products?.map((item) => ({
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price,
                color_id: item.color_id || null,
                size_id: item.size_id || null,
            })) || []
        );
        const order = await OrderRepo.createOrder(data, productsJSON);
        if (order) {
            const items = JSON.parse(order.items || '[]');
            const orderData = {
                orderNumber: order.order_code,
                order_id: order.order_id,
                customerName: order.full_name || 'Khách hàng',
                customerPhone: order.phone || 'N/A',
                totalAmount: order.final_amount || 0,
                items,
                shippingAddress: order.address_detail,
                paymentMethod: order.payment_method,
            };
            TelegramService.sendOrderNotification(orderData).catch((error) =>
                console.error('Failed to send Telegram notification:', error)
            );
        }

        await invalidateEntity('ORDERS');

        return order;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export const updateOrder = (id, data) => {
    if (!id) {
        throw new Error('Order ID is required');
    }
    if (!data || Object.keys(data).length === 0) {
        throw new Error('Order data is required for update');
    }
    return OrderRepo.updateOrder(id, data);
};

export const cancelOrder = async (orderId, userId) => {
    if (!orderId) {
        throw new Error('Order ID is required');
    }
    if (!userId) {
        throw new Error('User ID is required');
    }

    const order = await OrderRepo.getOrderById(orderId);
    if (!order) {
        throw new Error('Đơn hàng không tồn tại');
    }

    if (order.user_id !== userId) {
        throw new Error('Bạn không có quyền hủy đơn hàng này');
    }

    if (order.status === 'cancelled') {
        throw new Error('Đơn hàng đã được hủy');
    }

    if (order.status === 'delivered') {
        throw new Error('Không thể hủy đơn hàng đã giao');
    }

    return await OrderRepo.updateOrder(orderId, {
        status: 'cancelled',
        cancelled_at: new Date()
    });
};

export const updateOrderStatus = async (orderId, status, reason = '') => {
    if (!orderId) {
        throw new Error('Order ID is required');
    }
    if (!status) {
        throw new Error('Status is required');
    }

    const validStatuses = ['pending', 'rejected', 'confirmed', 'processing', 'shipping', 'delivered', 'cancelled', 'returned'];
    if (!validStatuses.includes(status)) {
        throw new Error('Trạng thái không hợp lệ');
    }

    try {



        const updatedOrder = await OrderRepo.updateOrder(orderId, status);

        // Send Telegram notification for status update
        if (updatedOrder) {
            const orderNumber = updatedOrder.order_number || orderId;
            TelegramService.sendOrderStatusUpdate(orderNumber, status, reason).catch(error => {
                console.error('Failed to send status update notification:', error);
            });
        }

        // Invalidate cache
        await CacheService.invalidateEntity('ORDERS');

        return updatedOrder;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};

export const getOrderTracking = async (orderId) => {
    if (!orderId) {
        throw new Error('Order ID is required');
    }

    const order = await OrderRepo.getOrderById(orderId);
    if (!order) {
        throw new Error('Đơn hàng không tồn tại');
    }

    // Tạo timeline tracking
    const tracking = {
        order_id: orderId,
        current_status: order.status,
        timeline: []
    };

    if (order.created_at) {
        tracking.timeline.push({
            status: 'pending',
            title: 'Đơn hàng đã được tạo',
            description: 'Đơn hàng của bạn đã được tạo và đang chờ xác nhận',
            timestamp: order.created_at,
            completed: true
        });
    }

    if (order.confirmed_at) {
        tracking.timeline.push({
            status: 'confirmed',
            title: 'Đơn hàng đã được xác nhận',
            description: 'Đơn hàng đã được xác nhận và đang chuẩn bị',
            timestamp: order.confirmed_at,
            completed: true
        });
    }

    if (order.shipped_at) {
        tracking.timeline.push({
            status: 'shipped',
            title: 'Đơn hàng đã được giao',
            description: 'Đơn hàng đã được giao cho đơn vị vận chuyển',
            timestamp: order.shipped_at,
            completed: true
        });
    }

    if (order.delivered_at) {
        tracking.timeline.push({
            status: 'delivered',
            title: 'Đơn hàng đã giao thành công',
            description: 'Đơn hàng đã được giao đến địa chỉ của bạn',
            timestamp: order.delivered_at,
            completed: true
        });
    }

    if (order.cancelled_at) {
        tracking.timeline.push({
            status: 'cancelled',
            title: 'Đơn hàng đã bị hủy',
            description: 'Đơn hàng đã được hủy',
            timestamp: order.cancelled_at,
            completed: true
        });
    }

    return tracking;
};

export const getOrdersByDateRange = (params) => OrderRepo.getOrdersByDateRange(params);