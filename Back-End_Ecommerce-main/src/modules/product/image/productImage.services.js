import * as ProductImageRepo from './productImage.repositories.js';
import cloudinary from '../../../shared/utils/cloudinary.js';

export const getProductImages = () => ProductImageRepo.getAllProductImages();
export const getProductImage = (id) => {
    if (!id) throw new Error('Product ID is required');
    return ProductImageRepo.getProductImageById(id);
};
export const createProductImage = (data) => {
    if (!data.product_id || !data.url) {
        throw new Error('Product ID and URL are required');
    }
    return ProductImageRepo.createProductImage(data);
};

export const deleteProductImage = async (id) => {
    try {
        // Lấy thông tin ảnh trước khi xóa
        const image = await ProductImageRepo.getProductImageByImageId(id);
        if (image && image.length > 0) {
            const imageUrl = image[0].url;

            // Xóa ảnh từ Cloudinary
            if (imageUrl && imageUrl.includes('cloudinary')) {
                const publicId = extractPublicIdFromUrl(imageUrl);
                if (publicId) {
                    await cloudinary.uploader.destroy(publicId);
                }
            }
        }

        return await ProductImageRepo.deleteProductImage(id);
    } catch (error) {
        console.error('Error deleting product image:', error);
        throw error;
    }
};

const extractPublicIdFromUrl = (url) => {
    if (!url) throw new Error('URL is required to extract public_id');
    const urlParts = url.split('/');
    const uploadIndex = urlParts.findIndex(part => part === 'upload');
    if (uploadIndex !== -1 && uploadIndex + 2 < urlParts.length) {
        const publicIdWithExtension = urlParts.slice(uploadIndex + 2).join('/');
        return publicIdWithExtension.split('.')[0]; // Loại bỏ extension
    }
    return null;
};