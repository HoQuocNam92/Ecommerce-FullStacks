// CartItem.js
import { ToUnitMoney } from "@/utils/ToUnitMoney";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function CartItem({ item, isSelected, onSelect }) {


  const { handleRemoveCart, handleUpdateCart } = useCart();

  const [qty, setQty] = useState(item.quantity);
  const handleIncrease = async (data) => {
    const newQty = qty + 1;
    await handleUpdateCart({ ...data, quantity: newQty });

    setQty(newQty);

  };
  const handleDecrease = async (data) => {
    if (qty > 0) {
      const newQty = qty - 1;
      setQty(newQty);
      await handleUpdateCart({ ...data, quantity: newQty });
      if (newQty === 0) {
        await handleRemoveCart(item?.id);
      }
    }
  };
  const handleQuantity = async (data) => {
    setQty(data);
  };





  return (
    <div className="grid grid-cols-12 py-4 border-b items-center text-center">
      <div className="flex items-center justify-start col-span-6 ">
        <div className="w-2 mx-3">
          <input type="checkbox" checked={isSelected} onChange={onSelect} />
        </div>
        <Link to={`/product/${item?.slug}`}>
          <div onSelec className="flex items-center gap-4 justify-center">

            <img src={item.thumbnail} alt={item.name} className="w-16 h-16" />
            <span className="text-left line-clamp-2">{item.name}</span>
          </div>
        </Link>
      </div>
      <div className="col-span-2">{ToUnitMoney(item.price)}</div>
      <div className="flex justify-center items-center gap-2 col-span-2">
        <button
          onClick={() =>
            handleDecrease({ stock: item.stock, product_id: item.product_id })
          }
          className="w-8 h-8 flex items-center justify-center border rounded"
        >
          −
        </button>
        <input
          type="number"
          value={qty}
          className="w-14 h-10 pl-3 text-center border rounded no-spinner "
          onChange={(e) => handleQuantity(e.target.value)}
        />
        <button
          onClick={() =>
            handleIncrease({ product_id: item.product_id })
          }
          className="w-8 h-8 flex items-center justify-center border rounded"
        >
          +
        </button>
      </div>
      <div className="col-span-1">{ToUnitMoney(item.subTotal)}</div>
      <div className="col-span-1">
        <button
          onClick={() => handleRemoveCart(item.id)}
          className="text-red-700 hover:underline"
        >
          <Trash2 />
        </button>
      </div>
    </div>
  );
}
