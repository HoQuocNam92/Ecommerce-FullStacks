import sql from 'mssql';

import db from '../../../shared/config/database.js';

export const createProduct = async (data) => {
    const pool = await db();
    const { name_product, slug, description, price, category_id } = data;

    const result = await pool.request()
        .input('name', sql.NVarChar(255), name_product)
        .input('slug', sql.NVarChar(255), slug)
        .input('description', sql.NVarChar(sql.MAX), description)
        .input('price', sql.Int, price)
        .input('category_id', sql.Int, category_id)
        .execute('AddProductFull');

    return result.recordset[0].product_id;
};

export const getProductSortByCategory = async (sortBy, orderBy, page, category_id) => {

    const pool = await db();
    let result = await pool.request()
        .input('SortBy', sql.NVarChar(255), sortBy)
        .input('OrderBy', sql.NVarChar(4), orderBy)
        .input('PageNumber', sql.Int, page)
        .input('category_id', sql.Int, category_id)
        .execute('GetProductSortByCategory');
    return result.recordset;
};


export const getProductSearchByCategory = async (
    categoryId,
    search,
    page,
    sortBy,
    limit = 30,
) => {
    const pool = await db();

    const result = await pool.request()
        .input("categoryId", sql.Int, categoryId)
        .input("search", sql.NVarChar(100), search || '')
        .input("page", sql.Int, page)
        .input("limit", sql.Int, limit)
        .input("sortBy", sql.NVarChar(50), sortBy)
        .execute("GetProductSearchByCategory");
    return result.recordset;
};


export const getProductsByCategory = async (category_id, page) => {

    const pool = await db();
    let result = await pool.request()
        .input('category_id', sql.Int, category_id)
        .input('PageNumber', sql.Int, page)
        .execute('GetProductByCategory');
    return result.recordset;
}

export const getProductRelated = async (id, category_id) => {
    const pool = await db();

    const result = await pool.request()
        .input('id', sql.Int, id)
        .input('category_id', sql.Int, category_id)
        .execute('GetProductRelated');

    return result.recordset;
}
export const getSearchProducts = async (search) => {
    const pool = await db();
    const result = await pool.request()
        .input('search', sql.NVarChar, search)
        .execute('GetSearchProducts');

    return result.recordset;
}

export const getTopProducts = async () => {
    const pool = await db();
    const result = await pool.request()
        .execute('GetProductTop');
    return result.recordset;
};



export const getColor = async () => {
    const pool = await db();
    const result = await pool.request().query('SELECT * from colors');
    return result.recordset;
};




export const getProductByMonth = async (month) => {
    const pool = await db();
    let result = null;



    result = await pool.request()
        .input('month', sql.Int, page)
        .execute('GetProductByMonth');
    const products = result.recordset.map(p => {
        let colorsArray = [];
        try {
            colorsArray = JSON.parse(p.colors || '[]');
            if (!Array.isArray(colorsArray)) colorsArray = [];
        } catch (e) {

            console.error("Parse colors failed for product", p.id, e);
        }

        let galleryArray = [];
        try {
            galleryArray = JSON.parse(p.gallery || '[]');
            if (!Array.isArray(galleryArray)) galleryArray = [];
        } catch (e) {
            console.error("Parse gallery failed for product", p.id, e);
        }

        return {
            ...p,
            colors: colorsArray,
            gallery: galleryArray,

        }
    });

    return products;
}

export const getAllProducts = async (page) => {

    const pool = await db();
    let result = await pool.request()
        .input('PageNumber', sql.Int, page)
        .execute('GetProduct');
    return result.recordset;
}



export const getProductBySlug = async (slug) => {
    const pool = await db();
    const result = await pool.request()
        .input('Slug', slug)
        .execute('GetProductDetails');

    const products = result.recordset.map(p => {
        let colorsArray = [];
        let sizeArray = [];
        let attributeArray = [];
        let galleryArray = [];

        try {
            colorsArray = JSON.parse(p.colors || '[]');
            if (!Array.isArray(colorsArray)) colorsArray = [];
        } catch (e) {

            console.error("Parse colors failed for product", p.id, e);
        }
        try {
            attributeArray = JSON.parse(p.attributes || '[]');
            if (!Array.isArray(attributeArray)) attributeArray = [];
        } catch (error) {
            console.error("Parse attributes failed for product", p.id, e);
        }
        try {
            galleryArray = JSON.parse(p.gallery || '[]');
            if (!Array.isArray(galleryArray)) galleryArray = [];
        } catch (e) {
            console.error("Parse gallery failed for product", p.id, e);
        }
        try {
            sizeArray = JSON.parse(p.sizes || '[]');
            if (!Array.isArray(sizeArray)) sizeArray = [];
        } catch (error) {
            console.error("Parse size failed for product", p.id, e);

        }
        return {
            ...p,
            colors: colorsArray,
            gallery: galleryArray,
            sizes: sizeArray,
            attributes: attributeArray
        }
    });
    return products[0];

}

export const deleteProduct = async (id) => {
    const pool = await db();

    return pool.request()
        .input('id', id)
        .query(`
            DELETE FROM products WHERE id = @id
        `);
}




export const getSaleProducts = async () => {
    const pool = await db();
    const result = await pool.request()
        .execute('GetFlashSaleProducts');

    return result.recordset;
};
