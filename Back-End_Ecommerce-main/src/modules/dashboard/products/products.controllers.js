import * as productServices from "./products.services.js";
import { success } from "#utils/response.js";

export const getProducts = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const data = await productServices.getProducts(page);
        return success(res, data, "Lấy danh sách sản phẩm thành công");
    } catch (err) {
        next(err);
    }
};

export const getProductDetail = async (req, res, next) => {
    try {
        const product = await productServices.getProductDetail(req.params.id);
        return success(res, product, "Lấy chi tiết sản phẩm thành công");
    } catch (err) {
        next(err);
    }
};



export const createProduct = async (req, res, next) => {
    try {

        const { name_product, description, price, category_id, variants, attributes } = req.body;
        const parsedVariants = typeof variants === 'string' ? JSON.parse(variants) : variants || [];
        const parsedAttributes = typeof attributes === 'string' ? JSON.parse(attributes) : attributes || [];

        const galleryFiles = Array.isArray(req.files?.gallery)
            ? req.files.gallery
            : req.files?.gallery
                ? [req.files.gallery]
                : [];

        const product = await productServices.createProduct({
            name_product,
            description,
            price,
            category_id,
            variants: parsedVariants,
            galleryFiles,
            attributes: parsedAttributes
        });

        return success(res, product, "Tạo sản phẩm thành công với variants, gallery và attributes");
    } catch (error) {
        next(error);
    }
};






export const updateProduct = async (req, res, next) => {
    try {
        const {
            id,
            name_product,
            description,
            price,
            category_id,
            variants,
            attributes,
            removeImages
        } = req.body;

        const parsedVariants =
            typeof variants === "string" ? JSON.parse(variants) : variants || [];

        const parsedAttributes =
            typeof attributes === "string" ? JSON.parse(attributes) : attributes || [];

        const parsedRemoveImages =
            typeof removeImages === "string"
                ? JSON.parse(removeImages)
                : removeImages || [];

        const galleryFiles = req.files?.gallery || [];

        await productServices.updateProduct({
            id,
            name_product,
            description,
            price,
            category_id,
            variants: parsedVariants,
            attributes: parsedAttributes,
            galleryFiles,
            removeImages: parsedRemoveImages
        });

        return success(res, null, "Cập nhật sản phẩm thành công");
    } catch (error) {
        next(error);
    }
};


export const deleteProduct = async (req, res, next) => {
    try {
        await productServices.deleteProduct(req.params.id);
        return success(res, null, "Xoá sản phẩm thành công")
    } catch (error) {
        next(error);
    }
};