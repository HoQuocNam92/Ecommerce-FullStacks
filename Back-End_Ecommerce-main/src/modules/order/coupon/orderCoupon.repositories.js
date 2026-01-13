


import db from "#db";
export const getCouponCode = async (couponCode) => {
    const pool = await db();
    const result = await pool
        .request()
        .input('couponCode', couponCode)
        .query(`
            SELECT *
            FROM coupons
            WHERE code = @couponCode
              AND start_date <= GETDATE()
              AND end_date >= GETDATE()
        `);

    return result?.recordset[0] || null;
};
