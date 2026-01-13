import db from '#db'
import sql from 'mssql'

export const getAllCoupons = async () => {
    const pool = await db()
    const result = await pool.request().query(`
        SELECT 
            id,
            code,
            discount_percent,
            max_discount_amount,
            min_order_amount,
            max_uses,
            used_count,
            start_date,
            end_date
        FROM coupons
    `)
    return result.recordset
}

export const createCoupon = async (data) => {
    const pool = await db()
    console.log("Check data", data)
    const result = await pool.request()
        .input('code', sql.NVarChar, data.code)
        .input('discount_percent', sql.Int, Number(data.discount_percent))
        .input('max_discount_amount', sql.Decimal(18, 2), Number(data.max_discount_amount) || 0)
        .input('min_order_amount', sql.Decimal(18, 2), Number(data.min_order_amount) || 0)
        .input('max_uses', sql.Int, Number(data.max_uses))
        .input('start_date', sql.DateTime, data.start_date)
        .input('end_date', sql.DateTime, data.end_date)
        .execute('CreateCoupon')
    console.log("Check result", result)
    return result.rowsAffected[0]
}

export const updateCoupon = async (id, data) => {
    const pool = await db()
    const result = await pool.request()
        .input('id', sql.Int, id)
        .input('code', sql.NVarChar, data.code)
        .input('discount_percent', sql.Int, data.discount_percent)
        .input('max_discount_amount', sql.Decimal(18, 2), data.max_discount_amount || 0)
        .input('min_order_amount', sql.Decimal(18, 2), data.min_order_amount || 0)
        .input('max_uses', sql.Int, data.max_uses)
        .input('start_date', sql.DateTime, data.start_date)
        .input('end_date', sql.DateTime, data.end_date)
        .query(`
            UPDATE coupons
            SET 
                code = @code,
                discount_percent = @discount_percent,
                max_discount_amount = @max_discount_amount,
                min_order_amount = @min_order_amount,
                max_uses = @max_uses,
                start_date = @start_date,
                end_date = @end_date
            WHERE id = @id
        `)

    return result.rowsAffected[0]
}

export const deleteCoupon = async (id) => {
    const pool = await db()
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query(`DELETE FROM coupons WHERE id = @id`)

    return result.rowsAffected[0]
}
