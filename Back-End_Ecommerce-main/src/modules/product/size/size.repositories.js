import db from "../../../shared/config/database.js"
export const getAllSizes = async () => {
    const pool = await db();
    const request = pool.request();
    const result = await request.query("Select id ,name from sizes ");
    return result.recordset;
}

export const addSizes = async (sizes) => {
    const pool = await db();
    const request = pool.request();
    const result = await request.input('@sizes', sizes).query("insert into  sizes values(@sizes) ");
    return result.recordset;
}