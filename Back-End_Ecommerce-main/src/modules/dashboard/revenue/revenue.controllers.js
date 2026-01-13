import * as revenueServices from './revenue.services.js';
import { success } from '../../../shared/utils/response.js';

export const getTotalRevenue = async (req, res, next) => {
    try {
        const year = req.query.year || new Date().getFullYear();

        const totalRevenue = await revenueServices.getTotalRevenue(year);
        success(res, totalRevenue, "Lấy tổng doanh thu thành công");
    } catch (error) {
        next(error);
    }
};

export const getMonthlyRevenue = async (req, res, next) => {


    const year = req.query?.year ?? new Date().getFullYear();
    try {
        const monthlyRevenue = await revenueServices.getMonthlyRevenue(year);
        success(res, monthlyRevenue, "Lấy doanh thu tháng thành công");
    } catch (error) {
        next(error);
    }
};

export const getRevenueProducts = async (req, res, next) => {

    const startDate = new Date(req.query?.startDate ?? Date.now() - 10 * 24 * 60 * 60 * 1000)
    const endDate = new Date(req.query?.endDate ?? Date.now())
    try {
        const monthlyRevenue = await revenueServices.getRevenueProducts(startDate, endDate);
        success(res, monthlyRevenue, "Lấy doanh thu  sản phẩm bán chạy thành công");
    } catch (error) {
        next(error);
    }
};