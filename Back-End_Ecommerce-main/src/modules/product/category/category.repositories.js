import Category from "./category.models.js";
import db from "../../../shared/config/database.js";


export const getAllCategories = async () => {
    const pool = await db();
    // const result = await pool.request().execute('GetCategories');
    // return result.recordset;
}
export const getCategoryById = async (id) => Category.findByPk(id);
export const createCategory = async (data) => Category.create(data);
export const updateCategory = async (data, id) => Category.update(data, { where: { id } });
export const deleteCategory = async (id) => Category.destroy({ where: { id } });

