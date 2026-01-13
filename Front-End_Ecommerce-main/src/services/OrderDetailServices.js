import instance from "@/utils/axiosInstance";

// export const CreateOrder = async (data) => {
//     const res = await instance.post("/orders", data);
//     return res.data;
// };

export const GetOrderDetails = async (order_id) => {
  const res = await instance.get(`/orders/order-details/${order_id}`);
  return res.data;
};
