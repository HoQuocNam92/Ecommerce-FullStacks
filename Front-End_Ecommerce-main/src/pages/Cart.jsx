import CartItem from "@/components/Cart/CartItem";
import CartSummary from "@/components/Cart/CartSummary";
import CouponForm from "@/components/Cart/CouponForm";
import { Button } from "@/components/ui";
import CartSkeleton from "@/components/Cart/CartSkeleton";
import { useCart } from "@/hooks/useCart";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EmptyCart from "@/components/Cart/EmptyCart";

import {
  RefreshCw,
  Package,
  Trash
} from "lucide-react";
import ToUnitMoney from "@/utils/ToUnitMoney";
import useAddress from "@/hooks/useAddress";
import { toast } from "sonner";
import toastConfirm from "@/utils/toastConfirm";

export default function Cart() {
  const [allSelected, setAllSelected] = useState(false);
  const [selectItems, setSelectItems] = useState([]);
  const navigate = useNavigate();
  const { cart, loading, clearAllCart } = useCart();

  const { GetAddress } = useAddress();


  const totalItem = () => {
    return cart
      .filter((item) => selectItems.includes(item.id))
      .reduce((sum, item) => sum + item.subTotal, 0);
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectItems([]);
    }
    else {
      setSelectItems(cart.map(x => x.id))
    }
    totalItem()
    setAllSelected(!allSelected);
  }

  const toggleSelectItem = (id) => {
    if (!selectItems.includes(id)) {
      setSelectItems((prev) => [...prev, id]);
    }
    else {
      setSelectItems((prev) => prev.filter(x => x !== id));
    }

  }

  useEffect(() => {
    setAllSelected(selectItems.length === cart.length && cart.length > 0)
  }, [selectItems, cart])

  const handleCheckout = () => {
    if (selectItems.length === 0) {
      alert('Vui lòng chọn ít nhất một sản phẩm để thanh toán');
      return;
    }
    const selectedProducts = cart.filter(item => selectItems.includes(item.id));
    navigate('/checkout', { state: { cart: selectedProducts, address: GetAddress.data.data } });
  };

  const handleRemoveAllCart = () => {
    try {
      toastConfirm("", "tất cả sản phẩm trong giỏ hàng", "", clearAllCart)
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }



  return (
    <div className="container">




      <div className="my-2">
        {loading && <CartSkeleton />}

        {!loading && cart.length > 0 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center  ">

                  <div className="w-2 mx-3">
                    <input type="checkbox" checked={allSelected}
                      onChange={toggleSelectAll} />
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    Tất cả sản phẩm ({cart.length})
                  </span>
                </div>

                <div className="flex items-center space-x-4 pe-4  ">
                  <button
                    onClick={handleRemoveAllCart}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                  >
                    <Trash className="w-4 h-4" />
                    <span>Xóa tất cả</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-6 border-b border-gray-200 bg-gray-50 font-medium text-gray-700">
                <div className="col-span-6">Sản phẩm</div>
                <div className="col-span-2 text-center">Đơn giá</div>
                <div className="col-span-2 text-center">Số lượng</div>
                <div className="col-span-1 text-center">Thành tiền</div>
                <div className="col-span-1 text-center">Thao tác</div>
              </div>

              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  isSelected={selectItems.includes(item.id)}
                  onSelect={() => toggleSelectItem(item.id)}
                />
              ))}
            </div>

            <div className="flex p-2 justify-between items-center bg-white rounded-lg shadow-sm border border-gray-200">

              <div className="ms-2">
                <p className="text-gray-600">
                  Tổng tiền :
                  <span className="text-red-700 ml-2 font-semibold text-xl">
                    {ToUnitMoney(totalItem())}
                  </span>
                </p>
              </div>
              <div className="flex items-center space-x-4 ">
                <span className="text-sm text-gray-600">
                  Đã chọn {selectItems.length} sản phẩm
                </span>
                <Button
                  onClick={handleCheckout}
                >
                  <Package className="w-5 h-5" /> Thanh toán
                </Button>
              </div>
            </div>


          </div>
        )}

        {!loading && cart.length === 0 && <EmptyCart />}
      </div>
    </div>
  );
}
