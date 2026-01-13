import db from "#db"
import Sql from 'mssql'
export const getTotalRevenue = async (year) => {
    const pool = await db();
    const result = await pool.request().input('year', year).execute('GetRevenue')
    return result.recordset[0];
}
export const getRevenueByMonth = async (year) => {
    const pool = await db();
    const result = await pool.request()
        .input('year', Sql.Int, year)
        .execute('GetRevenueByMonth');

    return result.recordset;
};


export const getRevenueProducts = async (startDate, endDate) => {
    const pool = await db();
    const result = await pool.request()
        .input('startDate', Sql.Date, startDate)
        .input('endDate', Sql.Date, endDate)
        .execute('GetRevenueProducts')
    return result.recordset
}