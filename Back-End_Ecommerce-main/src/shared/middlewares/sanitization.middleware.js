import { z } from 'zod';
import logger from '../config/logger.js';

// HTML sanitization function
export const sanitizeHtml = (input) => {
    if (typeof input !== 'string') return input;

    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
};

// SQL injection prevention
export const sanitizeSql = (input) => {
    if (typeof input !== 'string') return input;

    return input
        .replace(/('|(\\')|(;)|(\-\-)|(\*)|(\%))/g, '')
        .replace(/(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/gi, '');
};

// XSS prevention
export const sanitizeXss = (input) => {
    if (typeof input !== 'string') return input;

    return input
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
};

// General sanitization function
export const sanitizeInput = (input) => {
    if (typeof input === 'object' && input !== null) {
        const sanitized = {};
        for (const [key, value] of Object.entries(input)) {
            sanitized[key] = sanitizeInput(value);
        }
        return sanitized;
    }

    if (typeof input === 'string') {
        return sanitizeXss(sanitizeSql(sanitizeHtml(input)));
    }

    return input;
};

// Middleware to sanitize request body, query, and params
// export const sanitizeRequest = (req, res, next) => {
//     try {
//         // Sanitize request body
//         if (req.body) {
//             req.body = sanitizeInput(req.body);
//         }

//         // Sanitize query parameters
//         if (req.query) {
//             req.query = sanitizeInput(req.query);
//         }

//         // Sanitize route parameters
//         if (req.params) {
//             req.params = sanitizeInput(req.params);
//         }

//         next();
//     } catch (error) {
//         logger.error('Sanitization error:', error);
//         res.status(400).json({ error: 'Invalid input data' });
//     }
// };
// Middleware to sanitize request body, query, and params
export const sanitizeRequest = (req, res, next) => {
    try {
        // Sanitize request body
        if (req.body) {
            req.body = sanitizeInput(req.body);
        }

        // Sanitize query parameters
        if (req.query) {
            Object.assign(req.query, sanitizeInput(req.query)); // ✅ Fix
        }

        // Sanitize route parameters
        if (req.params) {
            Object.assign(req.params, sanitizeInput(req.params)); // ✅ Fix
        }

        next();
    } catch (error) {
        logger.error('Sanitization error:', error);
        res.status(400).json({ error: 'Invalid input data' });
    }
};

// Validation schemas
export const commonSchemas = {
    id: z.number().int().positive(),
    slug: z.string().min(1).max(255).regex(/^[a-z0-9-]+$/),
    email: z.string().email().max(255),
    password: z.string().min(6).max(255),
    name: z.string().min(1).max(255),
    description: z.string().max(1000).optional(),
    price: z.number().positive(),
    quantity: z.number().int().min(0),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(10)
};

// Validation middleware factory
export const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            const result = schema.safeParse({
                body: req.body,
                query: req.query,
                params: req.params
            });

            if (!result.success) {
                logger.warn('Validation failed:', {
                    errors: result.error.errors,
                    url: req.originalUrl,
                    method: req.method,
                    ip: req.ip
                });

                return res.status(400).json({
                    error: 'Validation failed',
                    details: result.error.errors
                });
            }

            // Update request with validated data
            req.validated = result.data;
            next();
        } catch (error) {
            logger.error('Validation middleware error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
};

// File upload validation
export const validateFileUpload = (allowedTypes = ['image/jpeg', 'image/png', 'image/gif'], maxSize = 5 * 1024 * 1024) => {
    return (req, res, next) => {
        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                return next();
            }

            const files = Object.values(req.files).flat();

            for (const file of files) {
                // Check file type
                if (!allowedTypes.includes(file.mimetype)) {
                    logger.warn('Invalid file type uploaded:', {
                        mimetype: file.mimetype,
                        originalname: file.originalname,
                        ip: req.ip
                    });
                    return res.status(400).json({
                        error: 'Invalid file type. Allowed types: ' + allowedTypes.join(', ')
                    });
                }

                if (file.size > maxSize) {
                    logger.warn('File too large uploaded:', {
                        size: file.size,
                        maxSize,
                        originalname: file.originalname,
                        ip: req.ip
                    });
                    return res.status(400).json({
                        error: `File too large. Maximum size: ${maxSize / (1024 * 1024)}MB`
                    });
                }
            }

            next();
        } catch (error) {
            logger.error('File validation error:', error);
            res.status(500).json({ error: 'File validation error' });
        }
    };
};

// Content Security Policy headers
export const cspHeaders = (req, res, next) => {
    res.setHeader('Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data: https:; " +
        "font-src 'self' data:; " +
        "connect-src 'self'; " +
        "frame-ancestors 'none';"
    );

    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

    next();
};



