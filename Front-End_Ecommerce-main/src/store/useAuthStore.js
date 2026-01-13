
import { create } from 'zustand';

import { persist } from 'zustand/middleware';
import * as AuthServices from "@/services/AuthServices";
import instance from '@/utils/axiosInstance';

export const useAuthStore = create(persist((set, get) => ({
  accessToken: null,
  refreshing: false,
  user: null,
  clearAccessToken: () => set({ accessToken: null }),
  clearUser: () => set({ user: null }),
  setUser: (user) => set({ user }),
  loading: {
    login: false,
    loginWithGoogle: false,
    signup: false,
    resetPassword: false,

  },
  error: {
    login: null,
    loginWithGoogle: null,
    signup: null,
    resetPassword: null,
  },
  setAccessToken: (token) => set({ accessToken: token }),
  login: async (payload) => {
    set((state) => ({ loading: { ...state.loading, login: true }, error: { ...state.error, login: null } }));
    try {
      const data = await AuthServices.Login(payload);
      if (data.user) {

        set({ user: data.user, accessToken: data.token });
        return true;
      }
    } catch (error) {
      set((state) => ({ error: { ...state.error, login: error?.response?.data?.message } }))
      throw error?.response?.data?.message

    }
    finally {
      set((state) => ({ loading: { ...state.loading, login: false } }));
    }
  },
  loginWithGoogle: async (payload) => {
    set((state) => ({ loading: { ...state.loading, loginWithGoogle: true }, error: { ...state.error, loginWithGoogle: null } }));
    try {
      const data = await AuthServices.LoginWithGoogle(payload);
      if (data.user) {
        set({ user: data.user, accessToken: data.token });

        return true;
      }
    } catch (error) {
      set((state) => ({ error: { ...state.error, loginWithGoogle: error?.response?.data?.message } }))
      throw error?.response?.data?.message
    }
    finally {
      set((state) => ({ loading: { ...state.loading, loginWithGoogle: false } }));
    }
  },
  logout: async () => {
    try {
      const res = await AuthServices.Logout();
      if (res.status === 200) {
        set({ user: null, accessToken: null });
        return true;
      }
    } catch (error) {
      set((state) => ({ error: { ...state.error, logout: error?.response?.data?.message } }))
      throw error?.response?.data?.message
    }

  },
  refreshToken: async () => {
    const { refreshing, setAccessToken, } = get();
    if (refreshing) return;
    set({ refreshing: true });
    try {
      const res = await instance.post("/auth/refresh-token");
      setAccessToken(res.data.data.token);
    }
    catch (err) {
      console.log(err);
    }
    finally {
      set({ refreshing: false });
    }
  },
  signup: async (payload) => {
    set((state) => ({ loading: { ...state.loading, signup: true }, error: { ...state.error, signup: null } }));
    try {
      const res = await AuthServices.Signup(payload);
      if (res.status === 200) {
        return res;
      }
    } catch (error) {
      set((state) => ({ error: { ...state.error, signup: error?.response?.data?.message } }))
      throw error.response?.data?.message;

    }
    finally {
      set((state) => ({ loading: { ...state.loading, signup: false } }));
    }
  },
  resetPassword: async (email) => {
    set((state) => ({ loading: { ...state.loading, resetPassword: true }, error: { ...state.error, resetPassword: null } }));
    try {
      await AuthServices.ForgotPassword(email);

    } catch (error) {
      set((state) => ({ error: { ...state.error, resetPassword: error?.response?.data?.message } }))
      throw error?.response?.data?.message
    } finally {
      set((state) => ({ loading: { ...state.loading, resetPassword: false } }));
    }
  }
}), {
  name: 'auth-storage',
  partialize: (state) => ({
    accessToken: state.accessToken,
    user: state.user,
  })
}
));

