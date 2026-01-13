import db from "#db"


export const getAllOrders = async (page, size) => {
    const pool = await db();

    const offset = (page - 1) * size;

    const result = await pool.request()
        .input('offset', offset)
        .input('size', size)
        .execute('GetOrderAll');
    return result.recordsets;
}

export const getOrderDetails = async (orderId) => {
    const pool = await db();

    const result = await pool.request()
        .input('orderId', orderId)
        .execute('GetOrderDetailsByAdmin');
    return result.recordsets[0];
}
export const updateStatusOrder = async (data) => {
    const { user_id, order_id, order_status, payment_status } = data;
    const pool = await db();

    const result = await pool.request()
        .input('user_id', user_id)
        .input('order_id', order_id)
        .input('order_status', order_status)
        .input('payment_status', payment_status)
        .execute('UpdateStatusOrder');
    return result.recordsets[0];
}





