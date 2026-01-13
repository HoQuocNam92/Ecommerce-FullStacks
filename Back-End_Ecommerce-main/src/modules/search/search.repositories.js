// search.repositories.js
import db from '../../shared/config/database.js';

export const searchProducts = async (options) => {
    const pool = await db();
    const { query, category, minPrice, maxPrice, sort, offset, limit } = options;
    
    let whereConditions = ['p.is_active = 1'];
    const params = {};
    
    // Search by query
    if (query) {
        whereConditions.push(`(
            p.name LIKE @query OR 
            p.description LIKE @query OR 
            p.tags LIKE @query
        )`);
        params.query = `%${query}%`;
    }
    
    // Filter by category
    if (category) {
        whereConditions.push('p.category_id = @category');
        params.category = category;
    }
    
    // Filter by price range
    if (minPrice !== null) {
        whereConditions.push('p.price >= @minPrice');
        params.minPrice = minPrice;
    }
    
    if (maxPrice !== null) {
        whereConditions.push('p.price <= @maxPrice');
        params.maxPrice = maxPrice;
    }
    
    // Sort options
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
            orderBy = 'p.rating DESC, p.votes DESC';
            break;
        case 'popular':
            orderBy = 'p.votes DESC';
            break;
        default:
            orderBy = 'p.created_at DESC';
    }
    
    // Build query
    const request = pool.request();
    Object.keys(params).forEach(key => {
        request.input(key, params[key]);
    });
    
    request.input('offset', offset);
    request.input('limit', limit);
    
    const result = await request.query(`
        SELECT p.*, c.name as category_name,
               COUNT(r.id) as review_count,
               AVG(CAST(r.rating AS FLOAT)) as avg_rating
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN reviews r ON p.id = r.product_id AND r.status = 'active'
        WHERE ${whereConditions.join(' AND ')}
        GROUP BY p.id, p.name, p.description, p.price, p.thumbnail, p.rating, p.votes, p.category_id, p.is_active, p.created_at, p.updated_at, c.name
        ORDER BY ${orderBy}
        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY
    `);
    
    // Get total count
    const countRequest = pool.request();
    Object.keys(params).forEach(key => {
        if (key !== 'offset' && key !== 'limit') {
            countRequest.input(key, params[key]);
        }
    });
    
    const countResult = await countRequest.query(`
        SELECT COUNT(*) as total
        FROM products p
        WHERE ${whereConditions.join(' AND ')}
    `);
    
    return {
        products: result.recordset,
        total: countResult.recordset[0].total,
        page: Math.floor(offset / limit) + 1,
        limit,
        totalPages: Math.ceil(countResult.recordset[0].total / limit)
    };
};

export const getSearchSuggestions = async (query) => {
    const pool = await db();
    const result = await pool.request()
        .input('query', `%${query}%`)
        .query(`
            SELECT DISTINCT TOP 10 p.name as suggestion, 'product' as type
            FROM products p
            WHERE p.name LIKE @query AND p.is_active = 1
            
            UNION ALL
            
            SELECT DISTINCT TOP 5 c.name as suggestion, 'category' as type
            FROM categories c
            WHERE c.name LIKE @query AND c.is_active = 1
            
            ORDER BY suggestion
        `);
    
    return result.recordset;
};

export const getPopularSearches = async () => {
    const pool = await db();
    const result = await pool.request()
        .query(`
            SELECT TOP 10 query, COUNT(*) as search_count
            FROM search_history
            WHERE created_at >= DATEADD(day, -30, GETDATE())
            GROUP BY query
            ORDER BY search_count DESC
        `);
    
    return result.recordset;
};

export const getRecentSearches = async (userId) => {
    const pool = await db();
    const result = await pool.request()
        .input('userId', userId)
        .query(`
            SELECT DISTINCT TOP 10 query
            FROM search_history
            WHERE user_id = @userId
            ORDER BY created_at DESC
        `);
    
    return result.recordset.map(row => row.query);
};

export const saveSearchHistory = async (userId, query) => {
    const pool = await db();
    const result = await pool.request()
        .input('userId', userId)
        .input('query', query)
        .query(`
            INSERT INTO search_history (user_id, query, created_at)
            VALUES (@userId, @query, GETDATE())
        `);
    
    return result.rowsAffected[0] > 0;
};