import * as ProductAttributeRepo from './productAttribute.repositories.js';

export const getProductAttributes = () => ProductAttributeRepo.getAllProductAttributes();
export const getProductAttribute = (id) => {
    if (!id) throw new Error('Product ID is required');
    return ProductAttributeRepo.getProductAttributeById(id);
};
export const createProductAttribute = (data) => {
    if (!data.product_id || !data.key || !data.value) {
        throw new Error('Product ID, name, and value are required');
    }
    ProductAttributeRepo.createProductAttribute(data)
};
export const deleteProductAttribute = (id) => {
    if (!id) throw new Error('Attribute ID is required');
    return ProductAttributeRepo.deleteProductAttribute(id);
};