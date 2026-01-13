import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { formCheckOutSchema } from '@/schema/formCheckOutSchema'
import { useOrders } from "@/hooks/useOrders";
import { useCart } from "@/hooks/useCart";
import { useAuthStore } from "@/store/useAuthStore";
const useCheckout = () => {
  const navigate = useNavigate();
  const account = useAuthStore((state) => state.user);
  const { cart, loading, GetCart } = useCart();
  const { CreateOrders, GetOrders } = useOrders();
  const [formData, setFormData] = useState({
    address_id: "",
    note: "",
    payment_method: "cod",
    total_amount: "",
    shippe_fee: "",
    coupon_code: "",
    final_amount: "",
    shipping_method: 1,
    color_id: "",
    size_id: "",
    products: [],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

  };

  const handleOrder = async () => {
    try {
      if (!account?.id) {
        toast.error("Vui lòng đăng nhập !")
        navigate('/auth/login')
        return null;
      }
      await formCheckOutSchema.validate(formData, { abortEarly: false });


      const result = await CreateOrders.mutateAsync(formData);
      await GetCart();
      navigate('/order-success', {
        state: {
          orderData: {
            id: result?.order_code,
            totalAmount: result?.final_amount,
            paymentMethod: formData.payment_method || 'cod',
            shippingAddress: `${result?.address_detail}`,
            items: cart.map(item => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              thumbnail: item.thumbnail
            }))
          }
        }
      });
    } catch (error) {

      toast.error(error?.response?.data?.error || error.errors[0]);
    }
  };

  return {
    formData,
    handleChange,
    handleOrder,
    cart,
    loading,
    setFormData,
    CreateOrders
    , GetOrders

  };
};

export default useCheckout;
