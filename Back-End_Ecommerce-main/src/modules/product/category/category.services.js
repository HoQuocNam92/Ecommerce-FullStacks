import * as CategoryRepo from './category.repositories.js';

export const getCategories = () => CategoryRepo.getAllCategories();
export const getCategory = (id) => {
    if (!id) throw new Error('Category ID is required');
    return CategoryRepo.getCategoryById(id);
};
export const createCategory = (data) => {
    if (!data.name) throw new Error('Category name is required');
    return CategoryRepo.createCategory(data);
};
export const updateCategory = (id, data) => {
    if (!id) throw new Error('Category ID is required');
    if (!data.name) throw new Error('Category name is required');
    return CategoryRepo.updateCategory(id, data);
}
export const deleteCategory = (id) => {
    if (!id) throw new Error('Category ID is required');
    return CategoryRepo.deleteCategory(id);
};