// cloudinary.route.js
import express from 'express';
import multer from 'multer';
import * as CloudinaryController from './cloudinary.controllers.js';
import authenticateToken from '../../shared/middlewares/Auth/authentication.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'), false);
        }
    }
});

// Protected routes
router.use(authenticateToken);

// Upload single image
router.post('/single', upload.single('image'), CloudinaryController.uploadImage);

// Upload multiple images
router.post('/multiple', upload.array('images', 5), CloudinaryController.uploadMultipleImages);

// Delete image
router.delete('/:public_id', CloudinaryController.deleteImage);

export default router;

