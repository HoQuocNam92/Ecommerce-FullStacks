import * as ordersRepository from './orders.repositories.js';

export const fetchAllOrders = async (page, size) => {
    const orders = await ordersRepository.getAllOrders(page, size);

    const totalPages = Math.ceil(orders[0][0].totalPages / size);
    const totalAmount = orders[0][0].totalAmount;

    const totalOrderToDay = Math.ceil(orders[1][0].totalOrderToDay / size);
    const totalAmountToDay = orders[1][0].totalAmountToDay;

    const totalOrder = orders[0][0].totalPages;
    const order = orders[2]
    return {
        totalAmount, totalPages, totalOrderToDay, totalAmountToDay, totalOrder, order
    }
}

export const getOrderDetails = async (userId) => {
    const res = await ordersRepository.getOrderDetails(userId);
    return res[0]
}
export const updateStatusOrder = async (data) => await ordersRepository.updateStatusOrder(data);


