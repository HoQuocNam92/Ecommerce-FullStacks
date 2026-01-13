import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Ecommerce",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        resource_type: "image",
        transformation: [
            {
                width: 1200,
                crop: "limit",
                quality: "auto",
                fetch_format: "auto"
            }
        ]
    }
});

const upload = multer({ storage });

export default upload;
