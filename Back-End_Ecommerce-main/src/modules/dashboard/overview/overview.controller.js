import * as OverviewServices from './overview.services.js'
import { success } from '#src/shared/utils/response.js'

export const getOverviewByYear = async (req, res, next) => {
    try {
        const data = await OverviewServices.getStatsByYear();
        return success(res, data, "Lấy stats thành công")
    } catch (error) {
        next(error)
    }
}