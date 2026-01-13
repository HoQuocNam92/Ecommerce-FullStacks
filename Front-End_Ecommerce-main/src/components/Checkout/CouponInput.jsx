import React, { useEffect, useState } from 'react';
import { Tag, Check, X } from 'lucide-react';
import useCoupons from '@/hooks/useCoupons';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
const CouponInput = ({ onCouponApplied }) => {
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const { setCode, coupon, isLoading, errors } = useCoupons();
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setCode(couponCode)

  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    onCouponApplied?.(null);
  };
  useEffect(() => {
    if (coupon) {
      setAppliedCoupon(coupon);
      onCouponApplied(coupon);

    }


    if (errors) {
      toast.error(errors?.response.data.message);
    }
  }, [coupon, errors])
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">Mã giảm giá</h3>

      {appliedCoupon ? (
        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">
              Đã áp dụng mã: {appliedCoupon.code}
            </span>
            <span className="text-green-600">
              {/* -{appliedCoupon.max_discount_amount.toLocaleString()}đ */}
            </span>
          </div>
          <button
            onClick={handleRemoveCoupon}
            className="text-green-600 hover:text-green-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Nhập mã giảm giá"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleApplyCoupon}
            disabled={isLoading || !couponCode.trim()}
            className="bg-red-700 hover:bg-red-600 disabled:bg-gray-400 text-white px-5 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Đang áp dụng...</span>
              </>
            ) : (
              <span>Áp dụng</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default CouponInput;
