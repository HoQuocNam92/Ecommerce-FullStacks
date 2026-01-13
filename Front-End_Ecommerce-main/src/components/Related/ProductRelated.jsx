import { ToUnitMoney } from "@/utils/ToUnitMoney";
import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const ProductRelated = ({ product }) => {
  return (
    <Link key={product.id} to={`/product/${product.slug}`} state={{ product }}>
      <div
        key={product.id}
        className="bg-white rounded-xl p-4 relative hover:shadow-md transition"
      >
        <div className="relative flex justify-center items-center h-48">
          <img
            src={product?.url}
            alt={product.name}
            className="max-h-full object-contain"
          />

        </div>

        <h3 className="text-base font-medium mt-4 line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-red-700 font-semibold text-lg">
            {ToUnitMoney(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-gray-400 line-through">
              {product.oldPrice}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <ReactStars count={5} value={product.rating || 0} edit={false} size={16} activeColor="#f59e0b" />
          <span className="text-gray-500 text-xs">{product.votes > 0 ? product.votes : "Chưa có đánh giá"}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductRelated;
