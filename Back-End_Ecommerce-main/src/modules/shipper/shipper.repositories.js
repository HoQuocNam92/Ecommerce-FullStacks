import db from "#db";


export const getAllShippingMethod = async () => {
    const pool = await db();
    const result = await pool.request().query("Select * from shipping_methods");
    return result.recordset
}