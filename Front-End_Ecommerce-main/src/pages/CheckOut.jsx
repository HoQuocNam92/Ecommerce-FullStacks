import React, { useEffect, useState } from 'react';
// import BillingForm from "@/components/Checkout/BillingForm";
import CheckOutSummary from "@/components/Checkout/CheckOutSummary";
import PaymentMethod from "@/components/Checkout/PaymentMethod";
import CouponInput from "@/components/Checkout/CouponInput";
import useCheckout from "@/hooks/useCheckout";
import { ShoppingCart, CreditCard, Shield, ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import useAddress from '@/hooks/useAddress';
import Spiner from '@/components/Spiner/Spiner';
import { toast } from 'sonner';
import useShipper from '@/hooks/useShipper';
import { Spinner } from '@/components/ui/spinner';
const Checkout = () => {
  const { formData, handleChange, handleOrder, setFormData, CreateOrders } = useCheckout();
  const { shipper, isLoading, error } = useShipper();
  const [coupon, setCoupon] = useState(null);
  const { state } = useLocation();
  const { GetAddress } = useAddress();
  const navigate = useNavigate();


  const address = GetAddress?.data?.data || [];
  const handleCheckout = async () => {
    try {
      await handleOrder();
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }

  };
  useEffect(() => {
    if (!state?.cart || !Array.isArray(state.cart) || state.cart.length === 0) {
      navigate("/", { replace: true });
    }
  }, [state]);


  if (isLoading) {
    return <Spinner />
  }
  if (!state?.cart || state.cart.length === 0) {
    return null;
  }
  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6 col-span-2">
            <CheckOutSummary handleChange={handleChange} setFormData={setFormData} formData={formData} cart={state?.cart} coupon={coupon} shipping_method={shipper} address={address} />



            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <Button
                onClick={handleCheckout}
                disabled={CreateOrders.isPending}
                className={'w-full'}
              >
                {CreateOrders.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Đang xử lý...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>Đặt hàng ngay</span>
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center mt-3">
                Bằng cách đặt hàng, bạn đồng ý với
                <a href="#" className="text-red-700 hover:underline">Điều khoản sử dụng</a>
                và
                <a href="#" className="text-red-700 hover:underline">Chính sách bảo mật</a>
              </p>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <PaymentMethod handleChange={handleChange} formData={formData} />
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <CouponInput onCouponApplied={setCoupon} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
