import instance from "@/utils/axiosInstance";

export const CreateOrder = async (data) => {
  const res = await instance.post("/orders", data);
  return res.data.data;
};

export const GetOrderByUser = async () => {
  const res = await instance.get(`/orders/user`);
  return res.data.data;
};
export const GetOrderById = async (id) => {
  const res = await instance.get(`/orders/${id}`);
  return res.data;
};
export const getOrders = async (page = 1) => {
  const res = await instance.get(`/dashboard/orders?page=${page}`);
  return res.data.data;
};
export const GetOrderRecent = async () => {
  const res = await instance.get('/orders/recents');
  return res.data.data;
};

export const getOrdersByAdmin = async (id) => {
  const res = await instance.get(`/dashboard/orders/${id}`);
  return res.data.data;
};



// export const GetOverview = async () => {
//   const res = await instance.get(`/analytics/overview`);
//   return res.data.data;
// };

// // Coupons
export const ListCoupons = async () => {
  const res = await instance.get(`/coupons`);
  return res.data;
};

export const CreateCouponApi = async (data) => {
  const res = await instance.post(`/coupons`, data);
  return res.data;
};

export const ApplyCoupon = async ({ code, order_total }) => {
  const res = await instance.post(`/coupons/apply`, { code, order_total });
  return res.data;
};

export const GetRevenueMonthly = async (params = {}) => {
  const res = await instance.get(`/analytics/revenue/monthly`, { params });
  return res.data;
};

export const GetRevenueByCategory = async (params = {}) => {
  const res = await instance.get(`/analytics/revenue/by-category`, { params });
  return res.data;
};

export const GetTopProducts = async (params = {}) => {
  const res = await instance.get(`/analytics/top-products`, { params });
  return res.data;
};

export const ExportOrdersExcel = async (params = {}) => {
  const res = await instance.get(`/orders/export/excel`, {
    params,
    responseType: 'blob'
  });
  return res;
};



export const updateStatusOrder = async (data) => {
  const res = await instance.put(`/dashboard/orders/update-status-order`, data);
  return res.data;
}