
import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import * as Cart from "@/services/CartServices";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from '@tanstack/react-query'
export const CartProvider = ({ children }) => {
  const account = useAuthStore((state) => state.user);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleAddCart = async (data) => {
    const { quantity, product_id, color, size } = data;
    try {

      const res = await Cart.AddCart({
        quantity: quantity,
        product_id: product_id,
        user_id: account.id,
        color_id: color,
        size_id: size
      });
      if (res && res.length > 0) {
        setCart(res);
        toast.success("Thêm sản phẩm thành công")
      }
      else {
        toast.error("Thêm sản phẩm thất bại !")
        return;
      }
    } catch (error) {
      throw error?.message;
    }
  };

  const handleUpdateCart = async (data) => {
    try {

      const res = await Cart.UpdateCart({ ...data, user_id: account.id });
      if (res.status === 200) {
        setCart((prev) =>
          prev.map((i) =>
            i.product_id === data.product_id
              ? { ...i, quantity: data.quantity, subTotal: (data.quantity * i.price) }
              : i,
          ),
        );
        toast.success("Update cart successfully!");
      }
    } catch (error) {
      setError(error?.message)

    }
  };

  const handleRemoveCart = async (cartId) => {
    try {

      const res = await Cart.DeleteCart(cartId);
      if (res.status === 200) {
        setCart((prev) => prev.filter((i) => i.id !== cartId));
        toast.success("Xóa sản phẩm khỏi giỏ hàng thành công");
      }
    } catch (error) {
      setError(error?.message)

    }
  };

  const clearAllCart = useMutation({
    mutationFn: async () => await Cart.DeleteAllCart(),
    onMutate: () => setCart([]),

  })
  const GetCart = async () => {

    setLoading(true);
    try {
      if (account?.id) {
        const res = await Cart.GetCart(account?.id);
        setCart(res);
      }

    } catch (error) {
      setError(error?.message)

    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    GetCart();
  }, [account?.id]);

  return (
    <CartContext.Provider
      value={{
        loading,
        cart,
        GetCart,
        handleAddCart,
        handleRemoveCart,
        handleUpdateCart,
        clearAllCart,
        error
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
