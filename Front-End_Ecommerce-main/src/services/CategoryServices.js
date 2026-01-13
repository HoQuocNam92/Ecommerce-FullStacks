import instance from "@/utils/axiosInstance";

export const getCategory = async () => {
  const res = await instance.get("/categories");
  return res.data.data;
};
export const getCategoryById = async (id) => {
  const res = await instance.get(`/categories/${id}`);
  return res.data.data;
};
export const deleteCategory = async (id) => {
  const res = await instance.delete(`/categories/${id}`);
  return res;
};
export const createCategory = async (data) => {
  const res = await instance.post("/categories", JSON.stringify(data));

  return res.data;
};
export const updateCategory = async (id, data) => {
  const res = await instance.put(`/categories/${id}`, data);
  return res.data;
};
