import { useAuthStore } from "@/store/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";




export default function RequireAuth() {
  const account = useAuthStore((state) => state.user);


  if (!account) {
    return <Navigate to="/auth/signin" replace />;
  }


  return <Outlet />;
}
