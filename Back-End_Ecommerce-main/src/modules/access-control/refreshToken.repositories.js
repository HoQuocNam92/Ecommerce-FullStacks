import db from "../../shared/config/database.js";
import sql from 'mssql'
export const getRefreshToken = async (id) => {
    try {
        const pool = await db();
        const request = pool.request()
            .input('userID', sql.Int, id)
        const result = await request.query('select top 1 tokenHash,expiresAt from refreshToken where user_id = @userID order by id desc')
        return result.recordset[0];
    } catch (error) {
        return error;
    }
}
export const updateRefreshToken = async ({ userID, tokenHash, expires }) => {

    try {
        const pool = await db();
        const request = pool.request()
            .input('userID', sql.Int, userID)
            .input('tokenHash', sql.NVarChar, tokenHash)
            .input('expires', sql.Date, expires)
        const result = await request.query('Update refreshToken set tokenHash = @tokenHash , expiresAt = @expires where user_id = @userID')
        return result;
    } catch (error) {
        return error;
    }
}
export const addRefreshToken = async ({ userID, tokenHash, expires }) => {

    try {
        const pool = await db();
        const request = pool.request()
            .input('userID', sql.Int, userID)
            .input('tokenHash', sql.NVarChar, tokenHash)
            .input('expires', sql.Date, expires)
        const result = await request.query('Insert into  refreshToken (user_id , tokenHash , expiresAt) values (@userID , @tokenHash , @expires)')
        return result;
    } catch (error) {
        return error;
    }
}

export const removeRefreshToken = async (id) => {
    try {
        const pool = await db();
        const request = pool.request()
            .input('userID', sql.Int, id)
        const result = await request.query('delete from refreshToken where user_id = @userID')

        return result.rowsAffected > 0;
    } catch (error) {
        return error;
    }
}