import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
const RequireAccount = () => {

  const user = useAuthStore((state) => state.user);

  if (user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default RequireAccount;
