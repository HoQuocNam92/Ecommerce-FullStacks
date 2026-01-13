// import CartItem from './cartItem.models.js';
import db from '../../shared/config/database.js';
import sql from 'mssql'
export const getAllCartItems = async () => {
    const pool = await db();
    const result = await pool.request().query('SELECT * FROM cart_items');
    return result.recordset;
}
export const getCartByUser = async (user_id) => {
    const pool = await db();
    const request = pool.request();
    const result = await request
        .input('user_id', sql.Int, user_id)
        .execute('GetCart')
    return result.recordset;
}
export const addCart = async (data) => {
    const { user_id, quantity, product_id } = data;
    const pool = await db();
    const request = pool.request();
    const result = await request
        .input('user_id', sql.Int, user_id)
        .input('product_id', sql.Int, product_id)
        .input('quantity', sql.Int, quantity)
        .input('color_id', sql.Int, data?.color_id)
        .input('size_id', sql.Int, data?.size_id)
        .execute('AddCart');

    return result.recordset;
}
export const updateCartQuantity = async (data) => {
    const { user_id, quantity, product_id } = data;
    const pool = await db();
    const request = pool.request();

    const result = await request
        .input('user_id', sql.Int, user_id)
        .input('quantity', sql.Int, quantity)
        .input('product_id', sql.Int, product_id)
        .input('color_id', sql.Int, data?.color_id)
        .input('size_id', sql.Int, data?.size_id)
        .execute('UpdateCartQuantity')

    return result.recordset;
}
export const UpdateCart = async (data) => {
    const { user_id, quantity, product_id } = data;
    const pool = await db();
    const request = pool.request();

    const result = await request
        .input('user_id', sql.Int, user_id)
        .input('quantity', sql.Int, quantity)
        .input('product_id', sql.Int, product_id)
        .input('color_id', sql.Int, data?.color_id)
        .input('size_id', sql.Int, data?.size_id)
        .execute('UpdateCart')

    return result.recordset;
}

export const deleteCart = async (id) => {
    const pool = await db();
    const request = pool.request();

    const result = await request
        .input('id', sql.Int, id)
        .query('DELETE FROM cart WHERE id = @id');
    return result.rowsAffected[0] > 0;
}


export const clearUserCart = async (user_id) => {
    const pool = await db();
    const request = pool.request();

    const result = await request
        .input('user_id', sql.Int, user_id)
        .query('DELETE FROM cart WHERE user_id = @user_id');
    return result.rowsAffected[0] > 0;
}
export const findCartByProductID = async (product_id, user_id) => {
    const pool = await db();
    const request = pool.request();
    const result = await request
        .input('product_id', sql.Int, parseInt(product_id))
        .input('user_id', sql.Int, parseInt(user_id))
        .query('SELECT id FROM cart WHERE product_id = @product_id and user_id = @user_id');
    return result.recordset[0]?.id > 0;
}