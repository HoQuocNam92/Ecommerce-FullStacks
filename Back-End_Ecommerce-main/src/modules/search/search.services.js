// search.services.js
import * as SearchRepo from './search.repositories.js';

export const searchProducts = async (options) => {
    const { query, category, minPrice, maxPrice, sort, page, limit } = options;
    const offset = (page - 1) * limit;
    
    if (!query && !category) {
        throw new Error('Từ khóa tìm kiếm hoặc danh mục là bắt buộc');
    }
    
    return await SearchRepo.searchProducts({
        query,
        category,
        minPrice,
        maxPrice,
        sort,
        offset,
        limit
    });
};

export const getSearchSuggestions = async (query) => {
    if (!query || query.length < 2) {
        return [];
    }
    
    return await SearchRepo.getSearchSuggestions(query);
};

export const getPopularSearches = async () => {
    return await SearchRepo.getPopularSearches();
};

export const getRecentSearches = async (userId) => {
    return await SearchRepo.getRecentSearches(userId);
};

export const saveSearchHistory = async (userId, query) => {
    if (!userId || !query) {
        throw new Error('User ID và từ khóa tìm kiếm là bắt buộc');
    }
    
    return await SearchRepo.saveSearchHistory(userId, query);
};