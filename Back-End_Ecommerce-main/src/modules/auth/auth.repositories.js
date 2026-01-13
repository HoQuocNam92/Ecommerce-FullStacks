import db from '../../shared/config/database.js';

import sql from "mssql"
export const getTokenByUserId = async (userId) => {

    const pool = await db();
    const result = await pool.request()
        .input('user_id', sql.Int, userId)
        .query(`
      SELECT TOP 1 * 
      FROM reset_password 
      WHERE user_id = @user_id 
        AND is_used = 0 
        
      ORDER BY created_at DESC
    `);
    return result.recordset[0] || null;
}
export const createTokenByUserId = async (userId, token, expiresAt) => {
    const pool = await db();
    const result = await pool.request()
        .input('user_id', sql.Int, userId)
        .input('token', sql.NVarChar, token)
        .input('expires_at', sql.DateTime, expiresAt)
        .query('insert into  reset_password (user_id,token,expires_at) values(@user_id,@token,@expires_at)');
    return result.recordset;
}
export const updateTokenByUserId = async () => {
    const pool = await db();
    const result = await pool.request()
        .query('update reset_password  set is_used = 1');
    return result.recordset;
}

export const Login = async (Email) => {
    const pool = await db();
    const result = await pool.request()
        .input('Email', sql.NVarChar, Email)
        .execute('VerifyLogin');
    return result.recordset[0];
}
export const FindEmail = async (Email) => {
    const pool = await db();
    const result = await pool.request()
        .input('Email', sql.NVarChar, Email)
        .query('Select 1 from users where email = @Email');
    return result.recordset[0];

}

export const GetRoleUserID = async (user_id) => {
    {
        const pool = await db();
        const result = await pool.request()
            .input('user_id', sql.Int, user_id)
            .execute('GetRoleByUserID');
        return result.recordset;
    }
}




