import logger from '../config/logger.js';

// HTTP request logger middleware
export const httpLogger = (req, res, next) => {
    const start = Date.now();

    // Log request
    logger.info(`${req.method} ${req.originalUrl} - ${req.ip} - ${req.get('User-Agent')}`);

    // Override res.end to log response
    const originalEnd = res.end;
    res.end = function (chunk, encoding) {
        const duration = Date.now() - start;
        const logMessage = `${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`;

        if (res.statusCode >= 400) {
            logger.error(logMessage);
        } else if (res.statusCode >= 300) {
            logger.warn(logMessage);
        } else {
            logger.info(logMessage);
        }

        originalEnd.call(this, chunk, encoding);
    };

    next();
};

// Error logger middleware
export const errorLogger = (err, req, res, next) => {
    logger.error(`${err.name}: ${err.message}`, {
        stack: err.stack,
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        body: req.body,
        params: req.params,
        query: req.query
    });

    next(err);
};

// Database query logger
export const dbLogger = (query, params) => {
    logger.debug(`DB Query: ${query}`, { params });
};

// Authentication logger
export const authLogger = (action, userId, ip, success = true) => {
    const message = `Auth ${action}: User ${userId} from ${ip} - ${success ? 'SUCCESS' : 'FAILED'}`;

    if (success) {
        logger.info(message);
    } else {
        logger.warn(message);
    }
};

// Business logic logger
export const businessLogger = (action, data, userId = null) => {
    logger.info(`Business Action: ${action}`, {
        userId,
        data: typeof data === 'object' ? JSON.stringify(data) : data
    });
};



