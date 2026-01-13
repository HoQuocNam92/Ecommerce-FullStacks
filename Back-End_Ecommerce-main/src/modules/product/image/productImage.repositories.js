import ProductImage from './productImage.models.js';
import db from '../../../shared/config/database.js';
import sql from 'mssql';

export const getAllProductImages = async () => {
    const pool = await db();
    const result = await pool.request().query(`
        SELECT pi.*,   p.name as product_name
        FROM ${ProductImage.tableName} pi
        LEFT JOIN products p ON pi.product_id = p.id
        ORDER BY pi.id DESC
    `);
    return result.recordset;
}
export const getProductImageById = async (id) => {
    const pool = await db();
    const result = await pool.request()
        .input('product_id', id)
        .query(`
            SELECT * FROM ${ProductImage.tableName} WHERE ${ProductImage.columns.product_id} = @product_id
        `);
    return result.recordset;
}

export const getProductImageByImageId = async (imageId) => {
    const pool = await db();
    const result = await pool.request()
        .input('id', imageId)
        .query(`
            SELECT * FROM ${ProductImage.tableName} WHERE id = @id
        `);
    return result.recordset;
}
export const createProductImage = async (data) => {
    const { product_id, url } = data;
    const pool = await db();
    return pool.request()
        .input('product_id', sql.Int, product_id)
        .input('url', sql.NVarChar, url)
        .query(`
            INSERT INTO ${ProductImage.tableName} (${ProductImage.columns.product_id}, ${ProductImage.columns.url})
            VALUES (@product_id, @url)
        `)
}
export const deleteProductImage = async (id) => {
    const pool = await db();
    return pool.request()
        .input('id', sql.Int, id)
        .query(`
            DELETE FROM ${ProductImage.tableName} WHERE id = @id
        `)
}