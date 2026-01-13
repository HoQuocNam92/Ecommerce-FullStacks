import React from "react";
import ProductRelated from "./ProductRelated";
import Slider from "@/components/Slider/Slider";
import { Link } from "react-router-dom";

const Related = ({ Product_related }) => {
  return (
    <Link to={`/product/${Product_related?.slug}`}>
      <section className="  p-2 shadow-1xl rounded-2xl mt-[70px] mb-[140px]    mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-red-700 font-semibold">
              <div className="w-[10px] h-5 bg-red-700 rounded-sm" />
              Có thể bạn cũng thích
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Slider Component={ProductRelated} products={Product_related} rows={4} />
        </div>
      </section>
    </Link>
  );
};

export default Related;
