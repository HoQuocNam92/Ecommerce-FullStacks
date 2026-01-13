import db from "#db";

// GET
export const getProductSale = async () => {
    const pool = await db();
    const result = await pool.request().execute('GetProductSales');
    return result.recordset;
};

// CREATE
export const createProductSale = async (data) => {
    const pool = await db();
    const result = await pool.request()
        .input('product_id', data.product_id)
        .input('sale_percent', data.sale_percent)
        .input('start_at', data.start_at)
        .input('end_at', data.end_at)
        .execute('CreateProductSale');

    return result.recordset[0];
};

// UPDATE
export const updateProductSale = async (id, data) => {
    const pool = await db();
    const result = await pool.request()
        .input('id', id)
        .input('sale_percent', data.sale_percent)
        .input('start_at', data.start_at)
        .input('end_at', data.end_at)
        .input('is_active', data.is_active)
        .execute('UpdateProductSale');

    return result.recordset[0];
};

// DELETE
export const deleteProductSale = async (id) => {
    const pool = await db();
    await pool.request()
        .input('id', id)
        .execute('DeleteProductSale');

    return true;
};
