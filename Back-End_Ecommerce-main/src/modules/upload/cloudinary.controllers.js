// cloudinary.controllers.js
import cloudinary from 'cloudinary';
import { success } from '../../shared/utils/response.js';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: 'ecommerce/reviews',
            transformation: [
                { width: 800, height: 600, crop: 'limit' },
                { quality: 'auto' }
            ]
        });

        return success(res, {
            url: result.secure_url,
            public_id: result.public_id,
            width: result.width,
            height: result.height
        }, 'Upload ảnh thành công');
    } catch (error) {
        next(error);
    }
};

export const uploadMultipleImages = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No image files provided' });
        }

        const uploadPromises = req.files.map(file => 
            cloudinary.v2.uploader.upload(file.path, {
                folder: 'ecommerce/reviews',
                transformation: [
                    { width: 800, height: 600, crop: 'limit' },
                    { quality: 'auto' }
                ]
            })
        );

        const results = await Promise.all(uploadPromises);
        
        const uploadedImages = results.map(result => ({
            url: result.secure_url,
            public_id: result.public_id,
            width: result.width,
            height: result.height
        }));

        return success(res, uploadedImages, 'Upload nhiều ảnh thành công');
    } catch (error) {
        next(error);
    }
};

export const deleteImage = async (req, res, next) => {
    try {
        const { public_id } = req.params;
        
        if (!public_id) {
            return res.status(400).json({ error: 'Public ID is required' });
        }

        const result = await cloudinary.v2.uploader.destroy(public_id);
        
        if (result.result === 'ok') {
            return success(res, null, 'Xóa ảnh thành công');
        } else {
            return res.status(404).json({ error: 'Image not found' });
        }
    } catch (error) {
        next(error);
    }
};

