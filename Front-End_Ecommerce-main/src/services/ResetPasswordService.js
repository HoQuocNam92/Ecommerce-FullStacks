import instance from "@/utils/axiosInstance";

export const VerifyPassword = async (token) => {
    const res = await instance.get(`/verifyResetToken/${token}`);
    return res.data.data;
};
export const ResetPassword = async (email) => {
    const res = await instance.post("/auth/forgot-password", { email });
    return res;
};
export const SetPassword = async (token, newPassword) => {
    const res = await instance.post(`/auth/reset-password/${token}`, {
        newPassword,
    });
    return res;
};