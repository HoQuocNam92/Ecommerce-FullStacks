import React from "react";

const PromoBanner = () => {
  return (
    <div className=" my-4 ">
      <section className=" relative bg-black text-white rounded p-6 mt-8 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold mb-2">
            Enhance Your Music Experience
          </h2>
          <p className="text-sm mb-3">25% OFF for first purchase</p>
          <button className="bg-green-700 px-4 py-2 rounded hover:bg-green-600 transition">
            Buy Now
          </button>
        </div>
        {/* <img
          src=""
          alt="Promo"
          className="w-48 h-auto object-contain"
        /> */}
      </section>
    </div>
  );
};

export default PromoBanner;
