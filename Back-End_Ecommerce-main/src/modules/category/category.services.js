// category.services.js
import * as CategoryRepo from './category.repositories.js';

export const getAllCategories = async () => {
    return await CategoryRepo.getAllCategories();
};

export const getCategoryById = async (id, PageNumber) => {
    if (!id) throw new Error('Category ID is required');

    const category = await CategoryRepo.getCategoryById(id, PageNumber);
    if (!category) {
        throw new Error('Danh mục không tồn tại');
    }

    return category;
};

export const createCategory = async (categoryData) => {
    const { name, description, image, parent_id, is_active = true } = categoryData;

    if (!name) {
        throw new Error('Tên danh mục là bắt buộc');
    }

    // Kiểm tra tên danh mục đã tồn tại chưa
    const existingCategory = await CategoryRepo.getCategoryByName(name);
    if (existingCategory) {
        throw new Error('Tên danh mục đã tồn tại');
    }

    const category = {
        name,
        description: description || '',
        image: image || null,
        parent_id: parent_id || null,
        is_active
    };

    return await CategoryRepo.createCategory(category);
};

export const updateCategory = async (id, updateData) => {
    if (!id) throw new Error('Category ID is required');

    const category = await CategoryRepo.getCategoryById(id);
    if (!category) {
        throw new Error('Danh mục không tồn tại');
    }

    const { name, description, image, parent_id, is_active } = updateData;

    // Kiểm tra tên danh mục nếu có thay đổi
    if (name && name !== category.name) {
        const existingCategory = await CategoryRepo.getCategoryByName(name);
        if (existingCategory && existingCategory.id !== id) {
            throw new Error('Tên danh mục đã tồn tại');
        }
    }

    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (description !== undefined) updateFields.description = description;
    if (image !== undefined) updateFields.image = image;
    if (parent_id !== undefined) updateFields.parent_id = parent_id;
    if (is_active !== undefined) updateFields.is_active = is_active;

    return await CategoryRepo.updateCategory(id, updateFields);
};

export const deleteCategory = async (id) => {
    if (!id) throw new Error('Category ID is required');

    const category = await CategoryRepo.getCategoryById(id);
    if (!category) {
        throw new Error('Danh mục không tồn tại');
    }

    // Kiểm tra xem có sản phẩm nào thuộc danh mục này không
    const productCount = await CategoryRepo.getCategoryProductCount(id);
    if (productCount > 0) {
        throw new Error('Không thể xóa danh mục có sản phẩm');
    }

    // Kiểm tra xem có danh mục con không
    const childCount = await CategoryRepo.getCategoryChildCount(id);
    if (childCount > 0) {
        throw new Error('Không thể xóa danh mục có danh mục con');
    }

    return await CategoryRepo.deleteCategory(id);
};

export const getCategoryProducts = async (categoryId, options = {}) => {
    const { page = 1, limit = 12, sort = 'newest' } = options;
    const offset = (page - 1) * limit;

    return await CategoryRepo.getCategoryProducts(categoryId, {
        offset,
        limit,
        sort
    });
};

export const getCategoryStats = async () => {
    return await CategoryRepo.getCategoryStats();
};

