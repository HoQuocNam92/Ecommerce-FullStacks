import { GetProfile, UpdateProfile, GetAllUsers } from "@/services/UserServices";
import { UserContext } from "./UserContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery, useMutation } from "@tanstack/react-query";
export const UserProvider = ({ children }) => {
  const account = useAuthStore((state) => state.user);


  const updateProfile = useMutation({
    mutationFn: async (data) => {
      const res = await UpdateProfile(data);
      return res;
    },
    enabled: !!account,
    onSuccess: (data) => {
      toast.success("Cập nhật thông tin thành công!");
      getProfile.refetch();
    },
    onError: (error) => {
      toast.error("Cập nhật thông tin thất bại!");
    },
  })

  const getProfile = useQuery({
    queryKey: ['getProfile', account?.id],
    queryFn: async () => {
      const res = await GetProfile();
      return res;
    },
    enabled: !!account,

  });







  return (
    <UserContext.Provider value={{ getProfile, updateProfile }}>
      {children}
    </UserContext.Provider>
  );

};