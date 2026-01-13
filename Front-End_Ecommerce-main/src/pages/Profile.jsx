import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import SideBar from "@/components/Profile/SideBar";

import ErrorFallback from "@/components/Error/ErrorFallback";

const EditProfileContent = () => {



  return (
    <div className="container-fluid ">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <SideBar />
          <Outlet />

        </div>

      </div>
    </div>
  );
};











export default function EditProfile() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <EditProfileContent />
    </ErrorBoundary>
  );
}
