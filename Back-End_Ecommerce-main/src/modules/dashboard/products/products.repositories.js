import sql from "mssql";
import db from "#db";
import cloudinary from "#src/shared/utils/cloudinary.js";

export const getProducts = async (page, size) => {
    const pool = await db();

    const offset = (page - 1) * size;

    const result = await pool.request()
        .input("offset", sql.Int, offset)
        .input("size", sql.Int, size)
        .query(`
      SELECT COUNT(*) OVER() AS total, *
      FROM products
      ORDER BY created_at DESC
      OFFSET @offset ROWS FETCH NEXT @size ROWS ONLY
    `);

    return {
        total: result.recordset[0]?.total || 0,
        items: result.recordset
    };
};

export const getProductById = async (id) => {
    const pool = await db();

    const res = await pool.request()
        .input("id", sql.Int, id)
        .query(`SELECT * FROM products WHERE id = @id`);
    return res.recordset[0];
};

export const getVariants = async (productId) => {
    const pool = await db();

    const res = await pool.request()
        .input("productId", sql.Int, productId)
        .query(`SELECT * FROM product_variants WHERE product_id = @productId`);
    return res.recordset;
};

export const getImages = async (productId) => {
    const pool = await db();
    const res = await pool.request()
        .input("productId", sql.Int, productId)
        .query(`SELECT url FROM product_images WHERE product_id = @productId`);
    return res.recordset;
};

export const getAttributes = async (productId) => {
    const pool = await db();

    const res = await pool.request()
        .input("productId", sql.Int, productId)
        .query(`SELECT * FROM product_attributes WHERE product_id = @productId`);
    return res.recordset;
};

export const createProduct = async (data) => {
    const pool = await db();
    const res = await pool.request()
        .input("name", sql.NVarChar, data.name_product)
        .input("slug", sql.VarChar, data.slug)
        .input("description", sql.NVarChar, data.description)
        .input("price", sql.Decimal, data.price)
        .input("category_id", sql.Int, data.category_id)
        .execute("CreateProduct");

    return res.recordset[0].productId;
};


export const deleteProduct = async (id) => {
    const pool = await db();

    await pool.request()
        .input("productId", sql.Int, id)
        .query(`
      DELETE FROM product_variants WHERE product_id = @productId;
      DELETE FROM product_images WHERE product_id = @productId;
      DELETE FROM product_attributes WHERE product_id = @productId;
      DELETE FROM products WHERE id = @productId;
    `);

    return true;
};
export const addProductVariant = async (productId, colorId, sizeId, quantity) => {
    const pool = await db();

    await pool.request()
        .input('product_id', sql.Int, productId)
        .input('color_id', sql.Int, colorId)
        .input('size_id', sql.Int, sizeId)
        .input('quantity', sql.Int, quantity)
        .query(`
            INSERT INTO product_variants (product_id, color_id, size_id, quantity)
            VALUES (@product_id, @color_id, @size_id, @quantity)
        `);
};

/**
 * Thêm ảnh sản phẩm
 */
export const addProductImage = async (productId, url) => {
    const pool = await db();

    await pool.request()
        .input('product_id', sql.Int, productId)
        .input('url', sql.NVarChar(sql.MAX), url)
        .query(`
            INSERT INTO product_images (product_id, url)
            VALUES (@product_id, @url)
        `);
};

export const addProductColors = async (productId, colors) => {
    const pool = await db();

    let arrColor = JSON.parse(colors);

    for (let { color_id, quantity } of arrColor) {

        await pool.request()
            .input('product_id', productId)
            .input('color_id', color_id)
            .input('quantity', quantity)
            .query(`
                    INSERT INTO product_colors (product_id, color_id, quantity)
                    VALUES (@product_id, @color_id, @quantity)
                `);
    }
};
export const addProductAttribute = async (productId, key, value) => {
    const pool = await db();

    await pool.request()
        .input('product_id', sql.Int, productId)
        .input('key', sql.NVarChar(255), key)
        .input('value', sql.NVarChar(sql.MAX), value)
        .query(`
            INSERT INTO product_attributes (product_id, [key], [value])
            VALUES (@product_id, @key, @value)
        `);
};

export const updateProduct = async (data) => {
    const pool = await db();
    const {
        id,
        name_product,
        slug,
        description,
        price,
        category_id,
        variants = [],
        galleryFiles = [],
        attributes = [],
        removeImages
    } = data;

    if (removeImages && removeImages.length > 0) {
        for (const url of removeImages) {
            const publicId = url
                .split('/upload/')[1]
                .split('/')
                .slice(1)
                .join('/')
                .replace(/\.[^/.]+$/, '');

            await cloudinary.uploader.destroy(publicId);

            await pool.request()
                .input('product_id', sql.Int, id)
                .input('url', sql.NVarChar(sql.MAX), url)
                .query(`
      DELETE FROM product_images
      WHERE product_id = @product_id AND url = @url
    `);
        }
    }


    await pool.request()
        .input('id', sql.Int, id)
        .input('name_product', sql.NVarChar(255), name_product)
        .input('slug', sql.NVarChar(255), slug)
        .input('description', sql.NVarChar(sql.MAX), description)
        .input('price', sql.Int, price)
        .input('category_id', sql.Int, category_id)
        .query(`
            UPDATE products
            SET 
                name = @name_product,
                slug = @slug,
                description = @description,
                price = @price,
                category_id = @category_id
            WHERE id = @id
        `);

    if (variants && variants.length > 0) {
        await pool.request().input('product_id', sql.Int, id)
            .query(`DELETE FROM product_variants WHERE product_id = @product_id`);
        for (const v of variants) {
            await pool.request()
                .input('product_id', sql.Int, id)
                .input('color_id', sql.Int, v.color_id)
                .input('size_id', sql.Int, v.size_id)
                .input('quantity', sql.Int, v.quantity)
                .query(`
                INSERT INTO product_variants (product_id, color_id, size_id, quantity)
                VALUES (@product_id, @color_id, @size_id, @quantity)
            `);
        }
    }



    if (galleryFiles && galleryFiles.length > 0) {
        for (const file of galleryFiles) {
            const result = await cloudinary.uploader.upload(file.path);

            await pool.request()
                .input('product_id', sql.Int, id)
                .input('url', sql.NVarChar(sql.MAX), result.secure_url)
                .query(`
      INSERT INTO product_images (product_id, url)
      VALUES (@product_id, @url)
    `);
        }
    }

    if (attributes && attributes.length > 0) {
        await pool.request().input('product_id', sql.Int, id)
            .query(`DELETE FROM product_attributes WHERE product_id = @product_id`);
        for (const attr of attributes) {
            await pool.request()
                .input('product_id', sql.Int, id)
                .input('key', sql.NVarChar(255), attr.key)
                .input('value', sql.NVarChar(sql.MAX), attr.value)
                .query(`
                INSERT INTO product_attributes (product_id, [key], [value])
                VALUES (@product_id, @key, @value)
            `);
        }
    }


    return { success: true };
};

