// category.controllers.js
import * as CategoryService from './category.services.js';
import { success } from '../../shared/utils/response.js';

export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await CategoryService.getAllCategories();
        return success(res, categories, 'Lấy danh sách danh mục thành công');
    } catch (error) {
        next(error);
    }
};

export const getCategoryById = async (req, res, next) => {
    try {
        const category = await CategoryService.getCategoryById(req.params.id, req?.query?.PageNumber);
        return success(res, category, 'Lấy thông tin danh mục thành công');
    } catch (error) {
        next(error);
    }
};

export const createCategory = async (req, res, next) => {
    try {
        const category = await CategoryService.createCategory(req.body);
        return success(res, category, 'Tạo danh mục thành công', 201);
    } catch (error) {
        next(error);
    }
};

export const updateCategory = async (req, res, next) => {
    try {
        const category = await CategoryService.updateCategory(req.params.id, req.body);
        return success(res, category, 'Cập nhật danh mục thành công');
    } catch (error) {
        next(error);
    }
};

export const deleteCategory = async (req, res, next) => {
    try {
        await CategoryService.deleteCategory(req.params.id);
        return success(res, null, 'Xóa danh mục thành công');
    } catch (error) {
        next(error);
    }
};

export const getCategoryProducts = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const { page = 1, limit = 12, sort = 'newest' } = req.query;

        const products = await CategoryService.getCategoryProducts(categoryId, {
            page: parseInt(page),
            limit: parseInt(limit),
            sort
        });

        return success(res, products, 'Lấy sản phẩm theo danh mục thành công');
    } catch (error) {
        next(error);
    }
};

export const getCategoryStats = async (req, res, next) => {
    try {
        const stats = await CategoryService.getCategoryStats();
        return success(res, stats, 'Lấy thống kê danh mục thành công');
    } catch (error) {
        next(error);
    }
};

