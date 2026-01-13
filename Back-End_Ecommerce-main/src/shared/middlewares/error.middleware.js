import { error } from '../utils/response.js';

const errorHandle = (err, req, res, next) => {

    console.log("Check err", err)
    if (err.code === 'USER_NOT_FOUND') {
        return error(res, 404, 'Không tìm thấy người dùng');
    }
    if (err.message === "PASSWORD_NOT_EXISTS") {
        return error(res, 500, "Tài khoản này là tài khoản Google không thể đổi mật khẩu ")
    }
    if (err.message === 'User ID is required') {
        return error(res, 400, 'Thiếu ID người dùng');
    }
    if (err.message === 'NOT_FOUND_TOKEN') {
        return error(res, 403, 'Không tìm thấy token');
    }
    if (
        err.message === 'Current password is required to set a new password' ||
        err.message === 'New password is required to change password'
    ) {
        return error(res, 400, err.message);
    }
    if (err.message === 'USER_ALREADY_EXISTS') {
        return error(res, 409, 'Tài khoản đã tồn tại');
    }
    if (err.message === 'INVALID_PASSWORD') {
        return error(res, 401, 'Sai mật khẩu');
    }

    if (err.message === 'UPDATE_FAILED') {
        return error(res, 500, 'Cập nhật người dùng thất bại');
    }

    if (err.message === 'VALIDATION_ERROR') {
        return error(res, 400, 'Dữ liệu không hợp lệ');
    }

    if (err.message === 'AUTHENTICATION_FAILED') {
        return error(res, 401, 'Xác thực thất bại');
    }

    if (err.message === 'FORBIDDEN') {
        return error(res, 403, 'Không có quyền truy cập');
    }

    if (err.message === 'NOT_FOUND') {
        return error(res, 404, 'Không tìm thấy tài nguyên');
    }

    if (err.message === 'REQUEST_TIMEOUT') {
        return error(res, 408, 'Hết thời gian yêu cầu');
    }

    if (err.message === 'EXPIRED_TOKEN') {
        return error(res, 401, 'Token đã hết hạn');
    }

    return error(res, 500, err);
};

export default errorHandle;
