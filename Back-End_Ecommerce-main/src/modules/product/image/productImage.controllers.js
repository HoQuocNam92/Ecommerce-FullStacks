import { success } from 'zod';
import * as ProductImageService from './productImage.services.js';

export const getProductImages = async (req, res, next) => {
    try {
        const images = await ProductImageService.getProductImages();
        return success(res, images);
    } catch (error) {
        next(error);
    }
};

export const getProductImageById = async (req, res, next) => {
    try {
        const images = await ProductImageService.getProductImage(req.params.product_id);
        return success(res, images);
    } catch (error) {
        next(error);
    }
};

export const addImage = async (req, res, next) => {
    try {
        const imageUrl = req.file.path;
        const productId = req.body.product_id;
        const savedImage = await ProductImageService.createProductImage({
            product_id: productId,
            url: imageUrl,
        });
        return success(res, savedImage, 'Image uploaded successfully');
    } catch (error) {
        next(error);
    }
};

export const uploadMultipleImages = async (req, res, next) => {
    try {
        const files = req.files;
        const productId = req.body.product_id;

        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        const uploadedImages = [];

        for (const file of files) {
            const savedImage = await ProductImageService.createProductImage({
                product_id: productId,
                url: file.path,
            });

            // Lấy thông tin ảnh vừa tạo
            const imageData = await ProductImageService.getProductImage(productId);
            const latestImage = imageData[imageData.length - 1];

            uploadedImages.push({
                id: latestImage.id,
                url: latestImage.url,
                product_id: latestImage.product_id
            });
        }

        return success(res, uploadedImages, 'Images uploaded successfully');
    } catch (error) {
        next(error);

    }
};

export const deleteImage = async (req, res, next) => {
    try {
        await ProductImageService.deleteProductImage(req.params.id);
        return success(res, 200, 'Image deleted successfully');
    } catch (error) {
        next(error);
    }
};
