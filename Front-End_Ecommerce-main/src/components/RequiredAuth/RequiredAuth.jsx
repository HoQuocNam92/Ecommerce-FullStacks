import React from "react";
// import Button from "../Common/Button";

import { Button } from "@/components/ui/button";
const RequiredAuth = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <img
        src="/images/login.png"
        alt="Login required"
        className="w-48 h-48 mb-6 opacity-80"
      />
      <h2 className="text-2xl font-semibold mb-2">Please log in</h2>
      <p className="text-gray-500 mb-6 max-w-md">
        You need to be logged in to view and manage your cart. Sign in now to
        continue shopping.
      </p>
      <Button href="/signin" >Đăng nhập ngay !</Button>
    </div>
  );
};

export default RequiredAuth;
