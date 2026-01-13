// search.controllers.js
import * as SearchService from './search.services.js';
import { success } from '../../shared/utils/response.js';

export const searchProducts = async (req, res, next) => {
    try {
        const { q, category, minPrice, maxPrice, sort, page = 1, limit = 12 } = req.query;
        
        const searchOptions = {
            query: q,
            category,
            minPrice: minPrice ? parseInt(minPrice) : null,
            maxPrice: maxPrice ? parseInt(maxPrice) : null,
            sort: sort || 'newest',
            page: parseInt(page),
            limit: parseInt(limit)
        };
        
        const results = await SearchService.searchProducts(searchOptions);
        return success(res, results, 'Tìm kiếm sản phẩm thành công');
    } catch (error) {
        next(error);
    }
};

export const getSearchSuggestions = async (req, res, next) => {
    try {
        const { q } = req.query;
        
        if (!q || q.length < 2) {
            return success(res, [], 'Gợi ý tìm kiếm');
        }
        
        const suggestions = await SearchService.getSearchSuggestions(q);
        return success(res, suggestions, 'Gợi ý tìm kiếm thành công');
    } catch (error) {
        next(error);
    }
};

export const getPopularSearches = async (req, res, next) => {
    try {
        const popularSearches = await SearchService.getPopularSearches();
        return success(res, popularSearches, 'Lấy tìm kiếm phổ biến thành công');
    } catch (error) {
        next(error);
    }
};

export const getRecentSearches = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const recentSearches = await SearchService.getRecentSearches(userId);
        return success(res, recentSearches, 'Lấy tìm kiếm gần đây thành công');
    } catch (error) {
        next(error);
    }
};

export const saveSearchHistory = async (req, res, next) => {
    try {
        const { query } = req.body;
        const userId = req.user.id;
        
        await SearchService.saveSearchHistory(userId, query);
        return success(res, null, 'Lưu lịch sử tìm kiếm thành công');
    } catch (error) {
        next(error);
    }
};