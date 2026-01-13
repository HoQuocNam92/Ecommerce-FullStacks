import db from "../../shared/config/database.js";
import sql from "mssql";

export const getAddress = async (userId) => {
    const pool = await db();
    const result = await pool.request()
        .input("user_id", sql.Int, userId)
        .execute('GetAddress')


    return result.recordset;
};

export const deleteAddress = async (user_id, id) => {
    const pool = await db();
    const result = await pool.request()
        .input("id", sql.Int, id)
        .input("user_id", sql.Int, user_id)
        .query("delete from address where user_id =@user_id and id =@id ")
    return result.rowsAffected[0] > 0;
};

export const addAddress = async ({
    user_id,
    full_name,
    phone,
    address_detail,
    is_default = 1,
    province_code,
    district_code,
    ward_code
}) => {
    const pool = await db();

    const result = await pool.request()
        .input("user_id", sql.Int, user_id)
        .input("full_name", sql.NVarChar(100), full_name)
        .input("phone", sql.VarChar(15), phone)
        .input("address_detail", sql.NVarChar(200), address_detail)
        .input("is_default", sql.Bit, is_default)
        .input("province_code", sql.Int, Number(province_code))
        .input("district_code", sql.Int, Number(district_code))
        .input("ward_code", sql.NVarChar(200), ward_code)
        .execute("AddAddress");

    return result.recordset;
};



export const update_Address = async (user_id, data) => {
    const {
        full_name,
        phone,
        address_detail,
        is_default = 1,
        province_code,
        id: address_id,
        district_code,
        ward_code
    } = data;
    const pool = await db();
    const result = await pool.request()
        .input("user_id", sql.Int, user_id)
        .input("address_id", sql.Int, address_id)
        .input("full_name", sql.NVarChar(100), full_name)
        .input("phone", sql.VarChar(15), phone)
        .input("address_detail", sql.NVarChar(200), address_detail || "")
        .input("is_default", sql.Bit, is_default)
        .input("province_code", sql.Int, Number(province_code))
        .input("district_code", sql.Int, Number(district_code))
        .input("ward_code", sql.NVarChar(200), ward_code)
        .execute("UpdateAddress");

    return result.rowsAffected[0] > 0;
};
