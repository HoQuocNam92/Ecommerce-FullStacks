import ReactStars from "react-rating-stars-component";
import ProductAction from "./ProductAction";
import DeliveryInfo from "@/components/DeliveryInfo/DeliveryInfo";
import ProductColorSelector from "./ProductColorSelector";
import { ToUnitMoney } from "@/utils/ToUnitMoney";
import ProductSizeSelector from "./ProductSizeSelector";
const ProductInfo = ({
  product,
  quantity,
  setQuantity,
  selectedColor,
  setSelectedColor,
  addCart,
  handleWishList,
  selectedSize,
  setSelectedSize,

}) => {
  return (
    <>
      <div className="flex w-full flex-col gap-4 p-4  rounded-2xl  bg-white">
        <div className="flex items-center gap-2">
          <h1 className="text-[20px] font-medium">{product?.name_product}</h1>
        </div>

        <div className="flex  ">
          <ReactStars count={5} value={product?.rating || 0} edit={false} size={18} activeColor="#f59e0b" />
          <span className="text-sm text-gray-500">{product?.votes > 0 ? `${product.votes} đánh giá` : "Sản phẩm mới"}</span>
          <span className="text-green-600 text-sm ml-4">
            {product?.quantity > 0 ? (
              `Hàng còn :  ${product?.quantity}`
            ) : (
              <span className="text-red-600">Hết hàng</span>
            )}
          </span>
        </div>

        <p className="text-xl font-semibold text-red-600">
          {ToUnitMoney(product?.price)}
        </p>

        <ProductColorSelector
          colors={product?.colors || []}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <ProductSizeSelector
          sizes={product?.sizes || []}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
        <ProductAction
          stock={product?.quantity}
          addCart={addCart}
          id={product?.id}
          quantity={quantity}
          setQuantity={setQuantity}
          handleWishList={handleWishList}
        />
        <DeliveryInfo />
      </div>
    </>
  );
};
export default ProductInfo;
