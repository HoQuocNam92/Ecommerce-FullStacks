
import { success } from "#src/shared/utils/response.js"
import * as shipperServices from './shipper.services.js'
export const getAllShippingMethod = async (req, res, next) => {
    try {
        const data = await shipperServices.getAllShippingMethod();
        return success(res, data, "Lấy phương thức giao hàng thành công")
    } catch (error) {
        next(error)
    }
}

