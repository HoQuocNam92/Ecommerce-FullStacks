import * as ProductRepo from './sale.repository.js';

// GET
export const getProductSale = async () =>
    ProductRepo.getProductSale();

// CREATE
export const createProductSale = async (data) =>
    ProductRepo.createProductSale(data);

// UPDATE
export const updateProductSale = async (id, data) =>
    ProductRepo.updateProductSale(id, data);

// DELETE
export const deleteProductSale = async (id) =>
    ProductRepo.deleteProductSale(id);
