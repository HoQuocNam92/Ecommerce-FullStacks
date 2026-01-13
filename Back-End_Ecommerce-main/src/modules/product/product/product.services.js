import { getCachedData } from '#src/shared/services/cache.service.js';
import cloudinary from '#src/shared/utils/cloudinary.js';
import * as ProductRepo from './product.repositories.js';
import { nanoid } from 'nanoid';

export const getProducts = async (page) => {
    if (!page) {
        throw new Error("Không có trang page number")

    }
    const key = `product:page:${page}`
    return await getCachedData('PRODUCTS', key, async () => await ProductRepo.getAllProducts(page))
    // return await ProductRepo.getAllProducts(page);
}
export const getProductSearchByCategory = async (
    categoryId,
    search = '',
    page = 1,
    sortBy
) => {
    if (!categoryId) {
        throw new Error("Thiếu categoryId");
    }
    const key = `products:cat:${categoryId}:q:${search}:page:${page}:sort:${sortBy || 'default'}`;

    return await getCachedData(
        'SEARCH',
        key,
        async () => {
            return await ProductRepo.getProductSearchByCategory(
                categoryId,
                search,
                page,
                sortBy
            );
        }
    );
};

export const getProductSortByCategory = async (sortBy = 'newest', page, category_id) => {

    if (!category_id) {
        throw new Error("Thiếu thông tin danh mục sản phẩm")
    }
    const sortType = { 'newest': 'created_at , desc', 'oldest': 'created_at , asc', 'price_asc': 'price , asc', 'price_desc': 'price , desc', 'name_asc': 'name_product , asc', 'name_desc': 'name_product , desc' }

    const sort = sortType[sortBy].split(' , ');
    if (!sort) {
        throw new Error("Kiểu sắp xếp không hợp lệ")
    }
    return await ProductRepo.getProductSortByCategory(sort[0], sort[1], page, category_id);
}
export const getProductsByCategory = async (category_id, page) => {
    if (!category_id) throw new Error("Thiếu thông tin danh mục sản phẩm");

    const key = `products:category:${category_id}:page:${page}`;

    return await getCachedData(
        'PRODUCTS',
        key,
        async () => {
            return await ProductRepo.getProductsByCategory(category_id, page);
        }
    );
};

export const getSearchProducts = async (search) => {

    return await ProductRepo.getSearchProducts(search);
}


export const getProductBySlug = async (slug) => {
    if (!slug) {
        throw new Error("Thiếu thông tin để lấy sản phẩm")
    }
    const key = `product:slug:${slug}`;

    return await getCachedData(
        'PRODUCTS',
        key,
        async () => {
            return await ProductRepo.getProductBySlug(slug);
        }
    );
};
export const getTopProducts = async () => {
    return await getCachedData(
        'PRODUCTS',
        'products:top',
        async () => {
            return await ProductRepo.getTopProducts();
        }
    );
};
export const getProductRelated = (id, category_id) => {
    return ProductRepo.getProductRelated(id, category_id)

}
export const getProductByMonths = (month) => {
    if (!slug) {
        throw new Error("Thiếu thông tin để lấy sản phẩm")
    }
    return ProductRepo.getProductByMonth(month)
};


export const getColors = () => ProductRepo.getColor();






export const getSaleProducts = async () => await ProductRepo.getSaleProducts();
