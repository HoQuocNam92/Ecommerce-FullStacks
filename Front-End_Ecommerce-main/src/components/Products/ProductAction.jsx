
import { useState } from "react";
import { Button } from "@/components/ui";
import { Heart, ShoppingCart, CreditCard, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const ProductAction = ({
  stock = 100,
  quantity,
  id,
  setQuantity,
  addCart,
  handleWishList
}) => {
  const [localQty, setLocalQty] = useState(quantity);

  const increment = () => {
    if (localQty < stock) {
      setLocalQty(localQty + 1);
      setQuantity(localQty + 1);
    } else {
      toast.error("Số lượng vượt quá tồn kho của màu này!");
    }
  };

  const decrement = () => {
    if (localQty > 1) {
      setLocalQty(localQty - 1);
      setQuantity(localQty - 1);
    }
  };


  return (
    <div className="flex flex-col gap-3 mt-2">
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-md border bg-white">
          <button
            className="px-3 py-2 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            onClick={decrement}
            disabled={localQty <= 1}
            aria-label="Giảm số lượng"
          >
            -
          </button>
          <span className="px-5 min-w-10 text-center font-medium">{localQty}</span>
          <button
            className="px-3 py-2 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            onClick={increment}
            disabled={localQty >= stock}
            aria-label="Tăng số lượng"
          >
            +
          </button>
        </div>

        <Button
          onClick={addCart}
          disabled={stock === 0}
          className="gap-2 bg-red-700 hover:bg-red-600 text-white"
        >
          <ShoppingCart size={18} /> Thêm vào giỏ
        </Button>
        <Button
          disabled={stock === 0}
          className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={addCart}
        >
          <CreditCard size={18} /> Mua ngay
        </Button>
        <Button
          onClick={() => handleWishList(id)}
          variant="outline"
          className="gap-2 cursor-pointer"
        >
          <Heart size={18} /> Yêu thích
        </Button>

      </div>


    </div>
  );
};

export default ProductAction;
