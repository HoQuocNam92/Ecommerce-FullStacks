import { success } from '../../../shared/utils/response.js';
import * as CategoryService from './category.services.js';

export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await CategoryService.getCategories();
        return success(res, categories);
    } catch (error) {
        next(error);
    }
};

export const getCategoryById = async (req, res, next) => {
    try {
        const category = await CategoryService.getCategory(req.params.id);
        return success(res, category);
    } catch (error) {
        next(error);

    }
};

export const createCategory = async (req, res, next) => {
    try {
        const category = await CategoryService.createCategory(req.body);
        return success(res, category, 'Category created successfully');
    } catch (error) {
        next(error);
    }
};

export const updateCategory = async (req, res, next) => {
    try {
        await CategoryService.updateCategory(req.params.id, req.body);
        return success(res, 200, 'Category updated successfully');
    } catch (error) {
        next(error);
    }
};

export const deleteCategory = async (req, res, next) => {
    try {

        await CategoryService.deleteCategory(req.params.id);
        return success(res, 200, 'Category deleted successfully');
    } catch (error) {
        next(error);
    }
};
