import db from "../../../shared/config/database.js"
export const getALLColors = async () => {
    const pool = await db();
    const request = pool.request();
    const result = await request.query("Select id ,name from colors ");
    return result.recordset;
}

export const addColors = async (name) => {
    const pool = await db();
    const request = pool.request();
    const result = await request.input("@name", name).query("Insert into  colors values(@name) ");
    return result.recordset;
}