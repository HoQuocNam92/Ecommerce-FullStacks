import ProductAttribute from './productAttribute.models.js';
import db from '../../../shared/config/database.js';
import sql from 'mssql';
export const getAllProductAttributes = async () => {
    const pool = await db();
    const result = await pool.request().query(`
        SELECT * FROM ${ProductAttribute.tableName}
    `);
    return result.recordset;
}
export const getProductAttributeById = async (id) => {
    const pool = await db();
    const result = await pool.request()
        .input('product_id', id)
        .query(`
            SELECT * FROM ${ProductAttribute.tableName} WHERE ${ProductAttribute.columns.product_id} = @product_id
        `);
    return result.recordset;
}
export const createProductAttribute = async (data) => {
    const { product_id, key, value } = data;

    const pool = await db();
    return pool.request()
        .input('product_id', sql.Int, product_id)
        .input('key', sql.NVarChar, key)
        .input('value', sql.NVarChar, value)
        .query(`
            INSERT INTO ${ProductAttribute.tableName} (${ProductAttribute.columns.product_id},[${ProductAttribute.columns.key}], ${ProductAttribute.columns.value})
            VALUES (@product_id, @key, @value)
        `);
}
export const deleteProductAttribute = async (id) => {
    const pool = await db();
    return pool.request()
        .input('id', id)
        .query(`
            DELETE FROM ${ProductAttribute.tableName} WHERE ${ProductAttribute.columns.id} = @id
        `);

}
