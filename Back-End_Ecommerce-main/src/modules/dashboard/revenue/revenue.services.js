import * as revenueRepositories from './revenue.repositories.js';



export const getTotalRevenue = async (year) => await revenueRepositories.getTotalRevenue(year);

export const getMonthlyRevenue = async (year) => await revenueRepositories.getRevenueByMonth(year);


export const getRevenueProducts = async (startDate, endDate) => await revenueRepositories.getRevenueProducts(startDate, endDate)