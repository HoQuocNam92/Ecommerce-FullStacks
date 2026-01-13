import instance from "@/utils/axiosInstance";

export const GetCart = async (id) => {
  const res = await instance.get(`/cart/user/${id}`);
  return res.data.data;
};

export const AddCart = async (data) => {
  const res = await instance.post("/cart", data);
  return res.data.data;
};


export const DeleteAllCart = async () => {
  const res = await instance.delete('/cart/clear');
  return res
}

export const DeleteCart = async (cartId) => {
  const res = await instance.delete(`/cart/${cartId}`);
  return res;
};

export const UpdateCart = async (data) => {
  const res = await instance.put("/cart", data);
  return res;
};
