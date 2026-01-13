// user.services.js
import * as UserRepo from './user.repositories.js';
// import * as bcrypt from '../../shared/utils/bcrypt.js'; // utils của bạn
import bcrypt from 'bcrypt'

export const getUser = (id) => {
    if (!id) throw new Error('User ID is required');
    return UserRepo.getUserId(id);
};

export const getUserProfile = async (user_id) => {
    if (!user_id) throw new Error('User_ID_is_requireds');
    const user = await UserRepo.getUserId(user_id);
    if (!user) throw { code: 'USER_NOT_FOUND' };
    return user;
};




export const updateProfile = async (id, data) => {

    if (!id) throw new Error('User ID is required');
    const { currentPassword, newPassword, confirmPassword } = data;
    const user = await UserRepo.findId(id);
    if (newPassword !== confirmPassword) throw new Error('New password and confirm password do not match');
    if (newPassword && newPassword.length < 6) throw new Error('New password must be at least 6 characters long');

    if (!user) throw { code: 'USER_NOT_FOUND' };
    if (newPassword && !user?.password) {
        throw new Error("PASSWORD_NOT_EXISTS")
    }
    if (currentPassword) {
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) throw { code: 'INVALID_PASSWORD' };
    }

    if (newPassword) {
        data.newPassword = await bcrypt.hash(newPassword, 10);

    }



    const updated = await UserRepo.updateUser(id, data);
    if (!updated) throw { code: 'UPDATE_FAILED' };

    return true;
};


export const deleteAccount = async (id, password) => {
    if (!id) throw new Error('User ID is required');
    if (!password) throw new Error('Password is required to delete account');

    const user = await UserRepo.getUserId(id);
    if (!user) throw { code: 'USER_NOT_FOUND' };

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw { code: 'INVALID_PASSWORD' };

    const deleted = await UserRepo.deleteUser(id);
    if (!deleted) throw { code: 'DELETE_FAILED' };

    return true;
};
