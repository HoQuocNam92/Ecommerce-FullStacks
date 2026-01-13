// src/pages/NewPassword.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Lock, Check } from "lucide-react";
import { ResetPassword, VerifyResetPasswordToken } from "@/services/AuthServices";
import { useLayoutEffect } from "react";

const NewPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [loading, setLoading] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await ResetPassword(token, newPassword);
      if (res.status === 200) {
        toast.success("Password updated successfully");
        navigate("/signin");
      }
    } catch (err) {
      toast.error("Failed to update password", err);
    }

  };

  const verifyPassword = async () => {
    setLoading(true);

    try {
      await VerifyResetPasswordToken(token);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      navigate("/NotFound");
    }
    finally {
      setLoading(false);
    }
  }


  useLayoutEffect(() => {
    verifyPassword();
  }, [token])

  // if (!valid) return null;

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <p className="text-gray-500">Validating reset link...</p>
      </div>
    );
  }
  return (
    <div className="container-fluid h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          🔑 Set New Password
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Please enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400"
                placeholder="Enter new password"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Check
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400"
                placeholder="Confirm new password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors"
          >
            Update Password
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          <a href="/signin" className="text-red-700 hover:underline">
            Đăng nhập
          </a>
        </p>
      </div>
    </div>
  );
};

export default NewPassword;
