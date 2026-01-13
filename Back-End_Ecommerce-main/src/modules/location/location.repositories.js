import db from "../../shared/config/database.js";
import sql from "mssql"
export const getProvinces = async () => {
    const pool = await db();
    const result = await pool.request()
        .query('Select code , name from provinces ORDER BY name');
    return result.recordset;
}
export const getDistricts = async (province_code) => {
    const pool = await db();
    const result = await pool.request()
        .input('province_code', sql.Int, province_code)
        .query('Select code , name from districts where province_code = @province_code ORDER BY name ');

    return result.recordset;
}
export const getWards = async (district_code) => {
    const pool = await db();
    const result = await pool.request()
        .input('district_code', sql.Int, district_code)
        .query('Select code , name  from wards where district_code  = @district_code ORDER BY name');
    return result.recordset;
}

