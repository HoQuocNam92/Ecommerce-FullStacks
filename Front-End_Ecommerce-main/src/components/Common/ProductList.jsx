import React from 'react'
import ReactStars from "react-rating-stars-component";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { Link } from 'react-router-dom';
import LazyLoad from '../LazyLoad/LazyLoad';
import ToUnitMoney from '@/utils/ToUnitMoney';

const ProductList = ({ product }) => {
    console.log("Check product", product)
    return (
        <Link
            key={product.id}
            to={`/product/${product.slug}`}
            state={{ product }}
        >
            <div
                className="bg-white border rounded-xl p-4 relative group hover:shadow-lg hover:border-gray-200 transition transform-gpu hover:-translate-y-1 hover:rotate-[0.15deg]"
            >
                {(product?.discount > 0 || product.isNew || product.sold_count > 100 || product.stock < 5 || product.fast_shipping) && (
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product?.discount > 0 && (
                            <span className="bg-red-700 text-white text-xs font-semibold px-2 py-0.5 rounded">
                                -{Math.round(product.discount)}%
                            </span>
                        )}
                        {product.isNew && (
                            <span className="bg-green-700 text-white text-xs font-semibold px-2 py-0.5 rounded">
                                NEW
                            </span>
                        )}
                        {product.sold_count > 100 && (
                            <span className="bg-amber-500 text-white text-xs font-semibold px-2 py-0.5 rounded">Bán chạy</span>
                        )}
                        {product.stock < 5 && (
                            <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded">Sắp hết</span>
                        )}
                        {product.fast_shipping && (
                            <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded">Giao nhanh</span>
                        )}
                    </div>
                )}

                <div className="relative flex justify-center items-center h-48">
                    <LazyLoad src={product?.gallery} alt={product.name_product} className="max-h-full object-contain drop-shadow-sm" />

                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                        {
                            product.sale_percent && <>
                                <div className="absolute -right-8 top-2 rotate-45 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-8 py-1 shadow-md">
                                    -{product.sale_percent}%
                                </div>
                            </>
                        }

                    </div>
                </div>

                <h3 className="text-base font-medium mt-4 line-clamp-2 min-h-12">{product.name_product}</h3>

                <div className="flex gap-2 mt-1">
                    <span className="text-red-700 font-semibold text-lg">
                        {ToUnitMoney(product?.final_price)}
                    </span>
                    {
                        product?.sale_percent && <>
                            <span className="text-gray-400 line-through">
                                {ToUnitMoney(product?.price)}
                            </span>
                        </>
                    }
                </div>


                <div className="flex items-center gap-2 mt-1">

                    <span className="text-black text-xs">
                        {(product.boughtProduct) >= 10000 ? (product.boughtProduct + "k") : product.boughtProduct > 0 ? `Đã bán ${product.boughtProduct}` : "Sản phẩm mới"}
                    </span>
                </div>

                {product.colors && (
                    <div className="flex gap-2 mt-3">
                        {product.colors.map((color, index) => (
                            <span
                                key={index}
                                className={`w-4 h-4 rounded-full border ${color === "black"
                                    ? "bg-black"
                                    : color === "red"
                                        ? "bg-red-700"
                                        : color === "lime"
                                            ? "bg-lime-400"
                                            : ""
                                    }`}
                            ></span>
                        ))}
                    </div>
                )}
            </div>
        </Link>
    )
}

export default ProductList