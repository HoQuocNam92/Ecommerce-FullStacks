import instance from "@/utils/axiosInstance";



export const GetProfile = async () => {
  try {
    const res = await instance.get("/users/profile");
    return res.data.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};

export const UpdateProfile = async (data) => {
  const res = await instance.put("/users/profile", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return res;
};




export const GetAllUsers = async (size, limit) => {
  const res = await instance.get(`/customers?pageSize=${limit}&pageNumber=${size}`);
  return res.data.data;
};
