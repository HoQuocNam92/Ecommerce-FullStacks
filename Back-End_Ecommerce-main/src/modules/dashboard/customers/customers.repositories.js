import db from "#db"


export const getAllCustomers = async (page, size) => {
    const pool = await db();
    const offset = (page - 1) * size;
    const result = await pool.request()
        .input('offset', offset)
        .input('size', size)
        .execute("GetCustomers");
    return result.recordset;
}


export const deleteCustomerById = async (id) => {
    const pool = await db();
    const query = `DELETE FROM users WHERE id = @userID`;
    const result = await pool.request()
        .input('userID', id)
        .query(query);

    return result.rowsAffected[0] > 0;
}


export const updateCustomerStatus = async (id, status) => {
    const pool = await db();
    const query = `UPDATE users SET status = @status WHERE id = @userID`;
    const result = await pool.request()
        .input('userID', id)
        .input('status', status)
        .query(query);
    return result.rowsAffected[0] > 0;
}

export const getTotalCustomers = async () => {
    const pool = await db();
    const query = `SELECT COUNT(*) AS total FROM users where role_id in (1)`;
    const result = await pool.request().query(query);
    return result.recordset[0].total;
}

export const searchCustomers = async (keyword) => {
    const pool = await db();
    const result = await pool.request()
        .input('keyword', keyword)
        .execute("GetSearchCustomers");
    return result.recordset;
}