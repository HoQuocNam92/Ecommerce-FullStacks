import React from "react";

const Input = (props) => {
  return (
    <>
      <input
        {...props}
        className={`w-full border-b py-2   outline-none border-gray-700/20`}
      />
    </>
  );
};

export default Input;
