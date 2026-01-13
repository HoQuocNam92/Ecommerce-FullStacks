import React from "react";


import { SkeletonCard } from "./SkeletonCard";
import { PaginationDemo } from "../Pagination/Pagination";

import ProductList from "@/components/Common/ProductList";
import Spiner from "../Spiner/Spiner";

const ProductGrid = ({ value }) => {
  const { products, setPages, pages, totalPages, productGridRef } = value;



  if (products?.isLoading) {
    return <Spiner />
  }
  return (
    <section ref={productGridRef} className="container-fluid   pb-5">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-red-700 font-semibold">
            <div className="w-[10px] h-5 bg-red-700 rounded-sm" />
            Sản phẩm của chúng tôi
          </div>
          <h2 className="text-[36px] font-semibold mt-2">
            Gợi ý hôm nay
          </h2>
        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2 mb-5">
        {products?.isLoading && Array.from({ length: 20 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}

        {products?.isSuccess && products?.data
          .map((product) => (
            <ProductList key={product?.id} product={product} />
          ))}
      </div>


      <PaginationDemo totalPages={totalPages} pages={pages} setPages={setPages} />

    </section>
  );
};

export default ProductGrid;
