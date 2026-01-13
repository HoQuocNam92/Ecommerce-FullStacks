import db from "#db"


export const getStatsByYear = async () => {
    const pool = await db();
    const result = await pool.request()
        .execute('GetDashboardStats')
    return result.recordset[0];
}