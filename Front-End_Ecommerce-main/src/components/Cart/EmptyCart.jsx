import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <img
          src="/images/empty-cart.png"
          alt="Empty cart"
          className="w-40 h-40 mb-6 opacity-80"
        />
        <h2 className="text-2xl font-semibold mb-2">Giỏ hàng bạn đang trống</h2>
        <p className="text-gray-500 mb-6">
          Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng. Hãy bắt đầu mua sắm
          ngay thôi!
        </p>
        <Button onClick={() => navigate('/')}  >
          Tiếp tục mua sắm
        </Button>
      </div>
    </>
  );
};

export default EmptyCart;
