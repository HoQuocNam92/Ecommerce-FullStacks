import React, { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const resetPassword = useAuthStore((state) => state.resetPassword);
  const loading = useAuthStore((state) => state.loading);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await resetPassword(email);
      navigate('/ForgotPasswordSuccess')
    } catch (error) {
      toast.error(error);
    }


  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 ">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          🔒 Recover Password
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Enter your email address and we’ll send you a recovery link.
        </p>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full"
          >
            Send Recovery Link
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Remember your password?{" "}
          <a href="/login" className="text-red-700 hover:underline">
            Login
          </a>
          <div className="h-8">{loading.resetPassword && <LoadingSpinner />}</div>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
