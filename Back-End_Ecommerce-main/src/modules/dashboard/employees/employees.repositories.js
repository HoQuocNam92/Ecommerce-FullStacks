import db from "#db"
import sql from 'mssql'

export const getAllEmployees = async (page, size) => {
    const pool = await db();
    const offset = (page - 1) * size;
    const result = await pool.request()
        .input('offset', offset)
        .input('size', size)
        .execute("GetEmployees");
    return result.recordset;
}


export const deleteEmployeeById = async (id) => {
    const pool = await db();
    const query = `DELETE FROM users WHERE id = @userID`;
    const result = await pool.request()
        .input('userID', id)
        .query(query);

    return result.rowsAffected[0] > 0;
}


export const updateEmployee = async (data) => {
    const { role_id, name, email, status, id, birth, phone, avatar, gender } = data;
    const pool = await db();
    const result = await pool.request()
        .input('id', sql.Int, id)
        .input('name', sql.NVarChar(255), name)
        .input('email', sql.NVarChar(100), email)
        .input('gender', sql.NVarChar(100), gender)
        .input('phone', sql.NVarChar(100), phone)
        .input('status', sql.NVarChar(100), status)
        .input('birth', sql.Date, birth)
        .input('avatar', sql.NVarChar(255), avatar)
        .input('role_id', sql.Int, role_id)
        .execute("UpdateEmployee");
    return result.rowsAffected[0][0] > 0;
}


export const createEmployee = async (data) => {
    const { role_id, name, email, status, birth, phone, avatar, gender } = data;
    const pool = await db();
    const result = await pool.request()
        .input('name', sql.NVarChar(255), name)
        .input('email', sql.NVarChar(100), email)
        .input('gender', sql.NVarChar(100), gender)
        .input('phone', sql.NVarChar(100), phone)
        .input('status', sql.NVarChar(100), status)
        .input('birth', sql.Date, birth)
        .input('avatar', sql.NVarChar(255), avatar)
        .input('role_id', sql.Int, role_id)
        .execute("CreateEmployee");

    return result.rowsAffected[0][0] > 0;

}


export const getTotalEmployees = async () => {
    const pool = await db();
    const query = `SELECT COUNT(*) AS total FROM users where role_id not in (1)`;
    const result = await pool.request().query(query);
    return result.recordset[0].total;
}

export const searchEmployees = async (keyword) => {
    const pool = await db();
    const result = await pool.request()
        .input('keyword', keyword)
        .execute("GetSearchCustomers");
    return result.recordset;
}