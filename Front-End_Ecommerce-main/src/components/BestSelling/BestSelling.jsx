import useProduct from "@/hooks/useProduct";
import React from "react";
import ProductList from "@/components/Common/ProductList";
import Slider from "../Slider/Slider";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const BestSelling = () => {
  const navigate = useNavigate();
  const { getTopProduct } = useProduct();

  return (
    <section className="mt-[70px] mb-[140px]  max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-red-700 font-semibold">
            <div className="w-[10px] h-5 bg-red-700 rounded-sm" />
            Tháng này
          </div>
          <h2 className="text-[36px] font-semibold mt-2">
            Sản phẩm bán chạy
          </h2>
        </div>
        <Button onClick={() => navigate('/products')}  >
          Xem tất cả
        </Button>
      </div>

      <div  >
        <Slider Component={ProductList} products={getTopProduct?.data} />
      </div>
    </section>
  );
};

export default BestSelling;
