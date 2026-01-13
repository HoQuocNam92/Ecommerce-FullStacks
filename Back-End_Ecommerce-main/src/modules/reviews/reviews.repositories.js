import db from '#db';
import sql from 'mssql';

export const getReviewsByProduct = async (ProductId) => {
    const pool = await db();
    const result = await pool.request()
        .input('ProductId', sql.Int, ProductId)
        .execute('GetReviewsByProduct');
    return result.recordset;
}

export const createReviewsByProduct = async (data) => {
    const { product_id, userId, rating, content, orderId } = data;
    const pool = await db();
    const result = await pool.request()
        .input('ProductId', sql.Int, parseInt(product_id))
        .input('userId', sql.Int, parseInt(userId))
        .input('rating', sql.Int, parseInt(rating))
        .input('comment', sql.NVarChar(255), content)
        .input('order_id', sql.Int, parseInt(orderId))
        .execute('CreateReviewsByProduct');
    return result.recordset[0]?.id;
}

export const createReviewImage = async (data) => {
    const { review_id, url } = data;
    const pool = await db();
    await pool.request()
        .input('review_id', sql.Int, review_id)
        .input('url', sql.NVarChar(255), url)
        .query('insert into  review_images (review_id , url) values(@review_id , @url)')

}