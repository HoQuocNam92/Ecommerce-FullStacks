import instance from "@/utils/axiosInstance";
import { toast } from "sonner";

export const GetBrand = async () => {
  const res = await instance.get("/brands");
  return res.data;
};
export const CreateBrand = async ({ name, logo }) => {
  if (!name || !logo) {
    toast.error("Name and logo are required");
    return;
  }
  const formData = new FormData();
  formData.append("name", name);
  formData.append("logo", logo);
  const res = await instance.post("/brands", formData, {
    headers: {
      "Content-Type": "multpart/form-data",
    },
  });
  await GetBrand();
  return res.data;
};
export const UpdateBrand = async (brandId, brandData) => {
  const res = await instance.put(`/brands/${brandId}`, brandData);
  return res.data;
};
export const DeleteBrand = async (brandId) => {
  const res = await instance.delete(`/brands/${brandId}`);
  return res;
};
