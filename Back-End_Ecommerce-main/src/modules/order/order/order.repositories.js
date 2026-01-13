import db from '#db'
import sql from 'mssql'

export const getAllOrders = async (pageNumber = 1) => {
    const pool = await db();
    const result = await pool.request()
        .input("pageNumber", sql.Int, pageNumber)
        .execute('GetOrderAll');
    return result.recordset;
}
export const getOrderById = async (user_id) => {
    const pool = await db();
    const result = await pool.request()
        .input("user_id", user_id)
        .execute('GetOrderByUserId');
    return result.recordset;
}
export const getOrderDetails = async (user_id, orderId) => {
    const pool = await db();
    const result = await pool.request()
        .input("user_id", sql.Int, user_id)
        .input("orderId", orderId)
        .execute('GetOrderDetails');
    return result.recordset[0];
}

export const getRecentOrders = async () => {
    const pool = await db();
    const result = await pool.request().execute('GetRecentOrders');
    return result.recordset;
}

export const getOrdersByDateRange = async ({ from, to }) => {
    const pool = await db();
    const request = pool.request();
    if (from) request.input('from', sql.DateTime, new Date(from));
    if (to) request.input('to', sql.DateTime, new Date(to));
    const where = (from || to)
        ? `WHERE ${[
            from ? 'created_at >= @from' : null,
            to ? 'created_at <= @to' : null,
        ].filter(Boolean).join(' AND ')}`
        : '';
    const result = await request.query(`
        SELECT id, user_id, total_amount, status, shipping_address, note, created_at
        FROM orders
        ${where}
        ORDER BY created_at DESC
    `);
    return result.recordset;
}



export const createOrder = async (data, productsJSON) => {
    const pool = await db();
    const {
        user_id,
        address_id,
        payment_method,
        shipping_fee,
        coupon_code,
        platform,
        shipping_method,
        note,

    } = data;


    const result = await pool
        .request()
        .input("user_id", sql.Int, user_id)
        .input("address_id", sql.Int, address_id)
        .input("payment_method", sql.NVarChar(50), payment_method)
        .input("products", sql.NVarChar(sql.MAX), productsJSON)
        .input("shipping_fee", sql.Decimal(18, 2), shipping_fee || 0)
        .input("coupon_code", sql.NVarChar(50), coupon_code || "")
        .input("platform", sql.NVarChar(50), platform || null)
        .input("shipping_method", sql.Int, parseInt(shipping_method) || 0)
        .input("note", sql.NVarChar(255), note || null)
        .execute("CreateOrder");

    // 🧾 Trả kết quả
    return result.recordset?.[0] || null;
};

export const updateOrder = async (orderId, status) => {

    const pool = await db();
    const result = await pool.request()
        .input('Order_id', orderId)
        .input('Status', status)
        .execute('UpdateOrder')

    return result.rowsAffected[0] > 0;


}
export const deleteOrder = async (id) => Order.destroy({ where: { id } });


