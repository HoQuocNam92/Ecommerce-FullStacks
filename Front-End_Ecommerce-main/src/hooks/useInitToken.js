import { useEffect } from "react";
import instance from "../utils/axiosInstance";
import useBearStore from "@/stores/useAuthStore";

const useInitToken = () => {
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const res = await instance.post(
          "/auth/refresh-token",
          {},
          { withCredentials: true },
        );
        useBearStore.getState().setToken(res.data.AccessToken);
      } catch (err) {
        useBearStore.getState().clearToken(); // hoặc giữ nguyên

      }
    };

    fetchAccessToken();
  }, []);
};

export default useInitToken;
