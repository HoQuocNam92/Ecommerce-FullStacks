// category.repositories.js
import db from '../../shared/config/database.js';

export const getAllCategories = async () => {
    const pool = await db();
    const result = await pool.request()
        .execute('GetCategories');

    return result.recordset;
};

export const getCategoryById = async (id, PageNumber = 1) => {
    const pool = await db();
    const result = await pool.request()
        .input('id', id)
        .input('PageNumber', PageNumber)
        .execute('GetCategoryById')

    return result.recordset;
};

export const getCategoryByName = async (name) => {
    const pool = await db();
    const result = await pool.request()
        .input('name', name)
        .query(`SELECT * FROM categories WHERE name = @name AND is_active = 1`);

    return result.recordset[0];
};

export const createCategory = async (categoryData) => {
    const pool = await db();
    const result = await pool.request()
        .input('name', categoryData.name)
        .input('description', categoryData.description)
        .input('image', categoryData.image)
        .input('parent_id', categoryData.parent_id)
        .input('is_active', categoryData.is_active)
        .query(`INSERT INTO categories (name, description, image, parent_id, is_active, created_at) 
                VALUES (@name, @description, @image, @parent_id, @is_active, GETDATE());
                SELECT SCOPE_IDENTITY() as id`);

    return result.recordset[0];
};

export const updateCategory = async (id, updateData) => {
    const pool = await db();
    const fields = [];
    const request = pool.request().input('id', id);

    Object.keys(updateData).forEach(key => {
        if (updateData[key] !== undefined) {
            fields.push(`${key} = @${key}`);
            request.input(key, updateData[key]);
        }
    });

    if (fields.length === 0) {
        return false;
    }

    fields.push('updated_at = GETDATE()');

    const result = await request.query(`UPDATE categories SET ${fields.join(', ')} WHERE id = @id`);
    return result.rowsAffected[0] > 0;
};

export const deleteCategory = async (id) => {
    const pool = await db();
    const result = await pool.request()
        .input('id', id)
        .query(`UPDATE categories SET is_active = 0, updated_at = GETDATE() WHERE id = @id`);

    return result.rowsAffected[0] > 0;
};

export const getCategoryProducts = async (categoryId, options = {}) => {
    const pool = await db();
    const { offset = 0, limit = 12, sort = 'newest' } = options;

    let orderBy = 'p.created_at DESC';
    switch (sort) {
        case 'price_asc':
            orderBy = 'p.price ASC';
            break;
        case 'price_desc':
            orderBy = 'p.price DESC';
            break;
        case 'name_asc':
            orderBy = 'p.name ASC';
            break;
        case 'name_desc':
            orderBy = 'p.name DESC';
            break;
        case 'rating':
            orderBy = 'p.rating DESC';
            break;
        default:
            orderBy = 'p.created_at DESC';
    }

    const result = await pool.request()
        .input('category_id', categoryId)
        .input('offset', offset)
        .input('limit', limit)
        .query(`
            SELECT p.*, c.name as category_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.category_id = @category_id AND p.is_active = 1
            ORDER BY ${orderBy}
            OFFSET @offset ROWS
            FETCH NEXT @limit ROWS ONLY
        `);

    return result.recordset;
};

export const getCategoryProductCount = async (categoryId) => {
    const pool = await db();
    const result = await pool.request()
        .input('category_id', categoryId)
        .query(`SELECT COUNT(*) as count FROM products WHERE category_id = @category_id AND is_active = 1`);

    return result.recordset[0].count;
};

export const getCategoryChildCount = async (categoryId) => {
    const pool = await db();
    const result = await pool.request()
        .input('category_id', categoryId)
        .query(`SELECT COUNT(*) as count FROM categories WHERE parent_id = @category_id AND is_active = 1`);

    return result.recordset[0].count;
};

export const getCategoryStats = async () => {
    const pool = await db();
    const result = await pool.request()
        .query(`
            SELECT 
                COUNT(*) as total_categories,
                COUNT(CASE WHEN parent_id IS NULL THEN 1 END) as parent_categories,
                COUNT(CASE WHEN parent_id IS NOT NULL THEN 1 END) as child_categories,
                AVG(CAST(product_count AS FLOAT)) as avg_products_per_category
            FROM (
                SELECT c.*, COUNT(p.id) as product_count
                FROM categories c
                LEFT JOIN products p ON c.id = p.category_id
                WHERE c.is_active = 1
                GROUP BY c.id, c.name, c.description, c.image, c.parent_id, c.is_active, c.created_at, c.updated_at
            ) as category_stats
        `);

    return result.recordset[0];
};

