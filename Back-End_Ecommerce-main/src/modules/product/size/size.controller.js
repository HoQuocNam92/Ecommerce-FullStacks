import { success } from "../../../shared/utils/response.js"
import { getAllSize } from "./size.services.js"
export const getAllSizes = async (req, res, next) => {
    try {
        const data = await getAllSize();
        success(res, data, "Lấy size thành công")
    } catch (error) {
        next(error)
    }
}