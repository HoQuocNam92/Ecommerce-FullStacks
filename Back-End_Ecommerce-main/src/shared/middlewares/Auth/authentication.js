
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            status: 401,
            message: 'Access Denied. No token provided!',
            data: null
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.AccessToken);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                status: 401,
                message: 'Token đã hết hạn',
                data: null
            });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                status: 401,
                message: 'Token không hợp lệ',
                data: null
            });
        } else {
            return res.status(500).json({
                success: false,
                status: 500,
                message: 'Lỗi xác thực',
                data: null
            });
        }
    }
}

export default authentication;
