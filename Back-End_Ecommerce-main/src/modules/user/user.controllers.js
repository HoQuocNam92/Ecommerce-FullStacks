import * as UserService from './user.services.js';
import { success } from '../../shared/utils/response.js';

export const getProfile = async (req, res, next) => {
    try {

        const user = await UserService.getUserProfile(req?.user?.id);
        return success(res, user, 'Lấy thông tin profile thành công');
    } catch (error) {
        next(error);
    }
};





export const updateProfile = async (req, res, next) => {
    try {
        const avatar = req?.files?.avatar;
        if (avatar) {
            req.body.avatar = avatar[0]?.path

        }
        await UserService.updateProfile(req.user.id, req.body);
        return success(res, null, 'Cập nhật profile thành công');
    } catch (error) {
        next(error);
    }
};

export const changePassword = async (req, res, next) => {
    try {
        await UserService.changePassword(req.user.id, req.body);
        return success(res, null, 'Đổi mật khẩu thành công');
    } catch (error) {
        next(error);
    }
};

export const getUserStats = async (req, res, next) => {
    try {
        const stats = await UserService.getUserStats(req.user.id);
        return success(res, stats, 'Lấy thống kê người dùng thành công');
    } catch (error) {
        next(error);
    }
};

export const uploadAvatar = async (req, res, next) => {
    try {
        const { avatarUrl } = req?.files?.avatar;
        await UserService.uploadAvatar(req.user.id, avatarUrl);
        return success(res, null, 'Cập nhật ảnh đại diện thành công');
    } catch (error) {
        next(error);
    }
};

export const deleteAccount = async (req, res, next) => {
    try {
        const { password } = req.body;
        await UserService.deleteAccount(req.user.id, password);
        return success(res, null, 'Xóa tài khoản thành công');
    } catch (error) {
        next(error);
    }
};

export const updateUserSettings = async (req, res, next) => {
    try {
        const { emailNotifications, smsNotifications } = req.body;
        const settings = {
            email_notifications: emailNotifications,
            sms_notifications: smsNotifications
        };

        await UserService.updateProfile(req.user.id, settings);
        return success(res, null, 'Cập nhật cài đặt thành công');
    } catch (error) {
        next(error);
    }
};

