import Review from './review.models.js';
import db from '../../../shared/config/database.js'
import sql from 'mssql'
export const getAllReviews = async (id) => {
    const pool = await db();
    const request = pool.request().input('product_id', sql.Int, id);
    const res = await request.execute('GetComment')
    return res.recordset;
}
export const getReviewById = async (id) => {
    const pool = await db();
    const request = pool.request().input('Product_ID', sql.Int, id);
    const res = await request.execute('GetReviewByID')
    return res.recordset;

}
export const createReview = async ({ user_id, product_id, rating, comment }) => {
    const pool = await db();
    const request = pool.request()
        .input('user_id', sql.Int, user_id)
        .input('product_id', sql.Int, product_id)
        .input('rating', sql.Int, rating)
        .input('comment', sql.NVarChar, comment)
    const res = await request.execute('AddComment');
    return res.recordset

};
export const updateReview = async (id, data) => Review.update(data, { where: { id } });
export const deleteReview = async (id) => Review.destroy({ where: { id } });
