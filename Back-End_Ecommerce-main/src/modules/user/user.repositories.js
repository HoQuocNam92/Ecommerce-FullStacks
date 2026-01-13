// user.repositories.js
import User from './user.models.js';
import db from '../../shared/config/database.js';
import sql from 'mssql'
export const getAllUsers = async () => {
    const pool = await db();
    const result = await pool.request().query(`SELECT * FROM ${User.tableName}`);
    return result.recordset;
};

export const getUserId = async (user_id) => {
    const pool = await db();
    const result = await pool.request()
        .input('user_id', sql.Int, user_id)
        .execute('GetProfile');
    return result.recordset[0];
};


export const createUser = async (data) => {
    const pool = await db();
    const result = await pool.request()
        .input('name', sql.NVarChar(100), data.name)
        .input('email', sql.NVarChar(100), data.email)
        .input('password', sql.NVarChar(255), data?.password || null)
        .input('avatar', sql.NVarChar(255), data?.picture || null)
        .input('is_google', sql.BigInt, data?.picture ? 1 : 0)
        .execute('CreateUser');
    return result.rowsAffected[0][0] > 0;
};

export const updateUser = async (user_id, updateData) => {
    const pool = await db();
    const { name, phone, birth, bio, email, gender, avatar, newPassword } = updateData;
    const req = pool.request();



    req.input('user_id', sql.Int, user_id);
    req.input('email', sql.NVarChar(100), email);
    req.input('full_name', sql.NVarChar(100), name);
    req.input('password', sql.NVarChar(255), newPassword || "");

    if (birth) {
        req.input('birth', sql.Date, new Date(birth));
    }
    if (gender) {
        req.input('gender', sql.NVarChar(50), gender);
    }
    if (phone) {
        req.input('phone', sql.NVarChar(50), phone);
    }
    if (bio) {
        req.input('bio', sql.NVarChar(255), bio);
    }
    if (avatar) {
        req.input('avatar', sql.NVarChar(255), avatar);
    }

    const result = await req.execute('UpdateProfile');

    return result.rowsAffected[0] > 0;
};

export const deleteUser = async (id) => {
    const pool = await db();
    // Soft delete by setting a deleted flag instead of actually deleting
    const result = await pool.request()
        .input('id', id)
        .query(`UPDATE ${User.tableName} SET deleted_at = GETDATE() WHERE id = @id`);
    return result.rowsAffected[0] > 0;
};

export const findEmail = async (email) => {
    const pool = await db();
    const result = await pool.request()
        .input('email', email)
        .query(`SELECT * FROM users WHERE email = @email`);
    return result.recordset[0];
};
export const findId = async (id) => {
    const pool = await db();
    const result = await pool.request()
        .input('id', id)
        .query(`SELECT password FROM users WHERE id = @id`);
    return result.recordset[0];
};
export const updatePassword = async (id, password) => {
    const pool = await db();
    const result = await pool.request()
        .input('id', id)
        .input('password', password)
        .query(`UPDATE ${User.tableName} SET password = @password WHERE id = @id`);
    return result.rowsAffected[0] > 0;
};

export const getUserStats = async (id) => {
    const pool = await db();

    // Get total orders count
    const ordersResult = await pool.request()
        .input('user_id', id)
        .query(`SELECT COUNT(*) as totalOrders, SUM(total_amount) as totalSpent FROM orders WHERE user_id = @user_id`);

    // Get wishlist items count
    const wishlistResult = await pool.request()
        .input('user_id', id)
        .query(`SELECT COUNT(*) as wishlistItems FROM wishlist WHERE user_id = @user_id`);

    // Get reviews count
    const reviewsResult = await pool.request()
        .input('user_id', id)
        .query(`SELECT COUNT(*) as reviewsCount FROM reviews WHERE user_id = @user_id`);

    return {
        totalOrders: ordersResult.recordset[0]?.totalOrders || 0,
        totalSpent: ordersResult.recordset[0]?.totalSpent || 0,
        wishlistItems: wishlistResult.recordset[0]?.wishlistItems || 0,
        reviewsCount: reviewsResult.recordset[0]?.reviewsCount || 0
    };
};

export const getUserAddresses = async (id) => {
    const pool = await db();
    const result = await pool.request()
        .input('user_id', id)
        .query(`SELECT * FROM user_addresses WHERE user_id = @user_id AND deleted_at IS NULL ORDER BY is_default DESC, created_at DESC`);
    return result.recordset;
};

export const addUserAddress = async (data) => {
    const pool = await db();
    const result = await pool.request()
        .input('user_id', data.user_id)
        .input('name', data.name)
        .input('phone', data.phone)
        .input('address', data.address)
        .input('province', data.province)
        .input('district', data.district)
        .input('ward', data.ward)
        .input('is_default', data.is_default || false)
        .query(`INSERT INTO user_addresses (user_id, name, phone, address, province, district, ward, is_default) VALUES (@user_id, @name, @phone, @address, @province, @district, @ward, @is_default)`);
    return result.rowsAffected[0] > 0;
};

export const updateUserAddress = async (id, data) => {
    const pool = await db();
    const fields = [];
    const request = pool.request().input('id', id);

    Object.keys(data).forEach(key => {
        if (data[key] !== undefined) {
            fields.push(`${key} = @${key}`);
            request.input(key, data[key]);
        }
    });

    if (fields.length === 0) {
        return false;
    }

    const result = await request.query(`UPDATE user_addresses SET ${fields.join(', ')} WHERE id = @id`);
    return result.rowsAffected[0] > 0;
};

export const deleteUserAddress = async (id) => {
    const pool = await db();
    const result = await pool.request()
        .input('id', id)
        .query(`UPDATE user_addresses SET deleted_at = GETDATE() WHERE id = @id`);
    return result.rowsAffected[0] > 0;
};

export const getAddressById = async (id) => {
    const pool = await db();
    const result = await pool.request()
        .input('id', id)
        .query(`SELECT * FROM user_addresses WHERE id = @id AND deleted_at IS NULL`);
    return result.recordset[0];
};

export const clearDefaultAddresses = async (userId) => {
    const pool = await db();
    const result = await pool.request()
        .input('user_id', userId)
        .query(`UPDATE user_addresses SET is_default = 0 WHERE user_id = @user_id`);
    return result.rowsAffected[0] > 0;
};