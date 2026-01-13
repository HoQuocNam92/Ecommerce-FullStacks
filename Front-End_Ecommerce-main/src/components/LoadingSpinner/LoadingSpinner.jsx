import React from "react";

const LoadingSpinner = () => {
  return (
    <div className=" ">
      <img
        src="/images/loading.png"
        alt="Loading..."
        className="w-8 h-8 animate-spin"
      />
    </div>
  );
};

export default LoadingSpinner;
