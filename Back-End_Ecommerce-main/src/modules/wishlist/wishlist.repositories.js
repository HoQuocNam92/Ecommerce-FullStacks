import db from '../../shared/config/database.js';
import sql from 'mssql'

export const getWishlistByUser = async (id) => {
    const pool = await db();
    const request = pool.request()
        .input('user_id', sql.Int, id)
    const result = await request.execute('GetWishList')
    return result.recordset
}
export const addToWishlist = async (data) => {
    const { user_id, product_id } = data
    const pool = await db();

    try {
        const request = await pool.request()
            .input('user_id', sql.Int, user_id)
            .input('product_id', sql.Int, product_id)
        const result = await request.execute('AddWishList')
        return result.rowsAffected[0] > 0;

    } catch (error) {
        throw error.message;
    }

}
export const removeFromWishlist = async (data) => {
    const { user_id, product_id } = data
    const pool = await db();
    const request = pool.request()
        .input('user_id', sql.Int, user_id)
        .input('product_id', sql.Int, product_id)
    const result = await request.execute('DeleteWishList')
    return result.rowsAffected[0] > 0;
}
