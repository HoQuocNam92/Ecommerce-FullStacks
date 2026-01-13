import cloudinary from "#src/shared/utils/cloudinary.js";
import { nanoid } from 'nanoid';
import slugify from "slugify";

import * as productRepo from "./products.repositories.js";
import { invalidateEntity } from "#src/shared/services/cache.service.js";
const PAGE_SIZE = 20;

export const getProducts = async (page) => {
    const res = await productRepo.getProducts(page, PAGE_SIZE);

    return {
        total: res.total,
        page,
        pageSize: PAGE_SIZE,
        items: res.items
    };
};

export const getProductDetail = async (productId) => {
    const product = await productRepo.getProductById(productId);
    const variants = await productRepo.getVariants(productId);
    const images = await productRepo.getImages(productId);
    const attributes = await productRepo.getAttributes(productId);

    return {
        ...product,
        variants,
        images,
        attributes
    };
};
export const updateProduct = async (data) => {




    const slugBase = data.name_product.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const slug = `${slugBase}-${nanoid(6)}`;

    const result = await productRepo.updateProduct({ ...data, slug });

    await invalidateEntity('PRODUCTS');

    return result;
};



export const createProduct = async (data) => {
    try {
        const {
            name_product,
            description,
            price,
            category_id,
            variants = [],
            galleryFiles = [],
            attributes = []
        } = data;



        const slugBase = slugify(name_product, {
            lower: true,
            strict: true,
            locale: 'vi',
            trim: true
        })
        const slug = `${slugBase}-${nanoid(6)}`;

        const productId = await productRepo.createProduct({
            name_product,
            slug,
            description,
            price,
            category_id
        });

        for (const v of variants) {
            await productRepo.addProductVariant(productId, null, null, v.quantity);
        }

        for (const file of galleryFiles) {
            await productRepo.addProductImage(productId, file.path);
        }

        for (const attr of attributes) {
            await productRepo.addProductAttribute(productId, attr.key, attr.value);
        }
        await invalidateEntity('PRODUCTS');

        return { productId };
    } catch (error) {
        console.error("Error in createProduct service:", error);
        throw error;
    }
};
export const deleteProduct = async (id) => {
    let images = await productRepo.getImages(id);
    if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
            let url = images[i].url
                .split('/upload/')[1]
                .split('/').slice(1)
                .join('/').replace(/\.[^/.]+$/, '')
            await cloudinary.uploader.destroy(url)
        }
    }
    const result = await productRepo.deleteProduct(id);

    await invalidateEntity('PRODUCTS');

    return result;
};
