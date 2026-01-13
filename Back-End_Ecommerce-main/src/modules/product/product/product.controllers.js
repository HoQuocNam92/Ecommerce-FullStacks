import * as ProductService from './product.services.js';
import { success } from '../../../shared/utils/response.js';
export const getAllProducts = async (req, res, next) => {
    try {

        const page = parseInt(req.query.page) || 1;

        const products = await ProductService.getProducts(page);
        return success(res, products, "Lấy danh sách sản phẩm thành công")
    } catch (error) {
        next(error);
    }
};

export const getProductSearchByCategory = async (req, res, next) => {
    try {
        const {
            categoryId,
            keyword = '',
            page = 1,
            sortBy
        } = req.query;

        const products = await ProductService.getProductSearchByCategory(
            Number(categoryId),
            keyword,
            Number(page),
            sortBy
        );

        return success(res, {
            items: products,
            totalPages: products[0]?.totalPages || 0,
            totalRecords: products[0]?.totalRecords || 0
        }, "Tìm kiếm sản phẩm theo danh mục thành công");
    } catch (error) {
        next(error);
    }
};

export const getProductSortByCategory = async (req, res, next) => {
    try {
        const { sortBy, category_id } = req.query;
        const page = parseInt(req.query.page) || 1;
        const products = await ProductService.getProductSortByCategory(sortBy, page, parseInt(category_id));
        return success(res, products, "Sắp xếp sản phẩm thành công")
    } catch (error) {
        next(error);
    }
}
export const getProductsByCategory = async (req, res, next) => {
    try {
        const category_id = parseInt(req.query.category_id);
        const page = parseInt(req.query.page) || 1;
        const products = await ProductService.getProductsByCategory(category_id, page);
        return success(res, products, "Lấy danh sách sản phẩm theo danh mục thành công")
    } catch (error) {
        next(error);
    }
};

export const getSearchProducts = async (req, res, next) => {
    try {
        const search = decodeURIComponent(req.query.keyword);
        const products = await ProductService.getSearchProducts(search);
        return success(res, products, "Lấy danh sách tìm kiếm sản phẩm thành công")
    } catch (error) {
        next(error);
    }
}
export const getProductRelated = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const category_id = parseInt(req.params.category_id);
        const products = await ProductService.getProductRelated(id, category_id);
        return success(res, products, "Lấy danh sách sản phẩm liên quan thành công")
    } catch (error) {
        next(error);
    }
}
export const getTopProducts = async (req, res, next) => {
    try {


        const products = await ProductService.getTopProducts();
        return success(res, products, "Lấy danh sách sản phẩm top thành công")
    } catch (error) {
        next(error);
    }
};

export const getALLColors = async (req, res, next) => {
    try {
        const colors = await ProductService.getColors();
        return success(res, colors, "Lấy danh sách màu sắc thành công")
    } catch (error) {
        next(error);
    }
}
export const getProductBySlug = async (req, res, next) => {
    try {


        const product = await ProductService.getProductBySlug(req.params.slug);
        return success(res, product, "Lấy chi tiết sản phẩm thành công")
    } catch (error) {
        next(error);
    }
};




export const getSaleProducts = async (req, res, next) => {
    try {
        const items = await ProductService.getSaleProducts();
        return res.json(items);
    } catch (e) {
        next(e);
    }
}

