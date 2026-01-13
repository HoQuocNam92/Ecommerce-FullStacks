import instance from "@/utils/axiosInstance";

export const Login = async (data) => {
  const res = await instance.post("/auth/login", data);
  return res.data;
};
export const LoginWithGoogle = async (data) => {
  const res = await instance.post("/auth/login-google", { id_token: data });
  return res.data;
};
export const Logout = async () => {
  const res = await instance.post("/auth/logout");
  return res;
};

export const Signup = async (data) => {
  const res = await instance.post("/auth/register", data);
  return res;
};


export const ForgotPassword = async (email) => {
  const res = await instance.post("/auth/forgot-password", { email });
  return res.data; // { message: "Recovery link sent" }
};

export const VerifyResetPasswordToken = async (token) => {
  const res = await instance.post(`/auth/verify-password/${token}`);
  return res.data; // { valid: true/false, message, userId? }
};

export const ResetPassword = async (token, newPassword) => {
  const res = await instance.post(`/auth/reset-password/${token}`, { newPassword });
  return res;
};

