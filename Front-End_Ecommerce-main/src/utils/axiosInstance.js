import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
const API_URL = import.meta.env.VITE_API_URL;
const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const refreshInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
const HandleRequestSuccess = async (config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const HandleRequestError = (err) => {
  return Promise.reject(err);
};

const HandleResponseSuccess = (response) => {
  return response;
};

const HandleResponseError = async (err) => {
  const originalRequest = err.config;
  if (originalRequest.url.includes("/login")) {
    return Promise.reject(err)
  }
  if (
    originalRequest &&
    !originalRequest._retry &&
    err.response.status === 401
  ) {
    originalRequest._retry = true;
    const { refreshToken } = useAuthStore.getState();
    try {
      await refreshToken();
      const newToken = useAuthStore.getState().accessToken;
      if (!newToken) throw new Error("No new access token");
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return instance(originalRequest);
    } catch (error) {
      useAuthStore.getState().clearUser();
      useAuthStore.getState().clearAccessToken();
      useAuthStore.getState().logout();
      return Promise.reject(error);
    }
  }
  return Promise.reject(err);
};

instance.interceptors.request.use(
  (config) => HandleRequestSuccess(config),
  (error) => HandleRequestError(error),
);

instance.interceptors.response.use(
  (config) => HandleResponseSuccess(config),
  (error) => HandleResponseError(error),
);

export default instance;
