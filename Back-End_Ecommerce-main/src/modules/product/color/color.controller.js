import { success } from "../../../shared/utils/response.js"
import { getALLColor } from "./color.services.js"
export const getAllColors = async (req, res, next) => {
    try {
        const data = await getALLColor();
        success(res, data, "Lấy màu thành công")
    } catch (error) {
        next(error)
    }
}