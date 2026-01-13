import { ToUnitMoney } from "@/utils/ToUnitMoney";
import { Button } from "@/components/ui/button";
export default function CartSummary({ cart, coupon }) {
  const total = cart.reduce(
    (sum, item) => (sum += item.price * item.quantity),
    0,
  );
  const shipThreshold = 0; // free ship từ 500k
  const baseShip = 0;
  const shipping = total >= shipThreshold || coupon === 'FREESHIP' ? 0 : baseShip;
  const discount = coupon === 'P10' ? total * 0.1 : coupon === 'P5' && total >= 200000 ? total * 0.05 : 0;
  const grand = Math.max(0, total - discount) + shipping;

  return (
    <div className="border ps-6 pe-6 pt-8 pb-8 w-[470px]   text-[16px]">
      <h3 className="text-[20px] font-semibold mb-5">Cart Total</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between pb-3 border-b-[1px] border-gray-500">
          <span className="text-[16px] ">Subtotal:</span>
          <span className="text-[16px]">{ToUnitMoney(total)}</span>
        </div>
        <div className="flex justify-between pb-3  border-b-[1px] border-gray-500">
          <span className="text-[16px]">Shipping:</span>
          <span className="text-[16px]">{shipping === 0 ? 'Free' : ToUnitMoney(shipping)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between pb-3  border-b-[1px] border-gray-500">
            <span className="text-[16px]">Discount:</span>
            <span className="text-[16px]">- {ToUnitMoney(discount)}</span>
          </div>
        )}
        <div className="flex justify-between  pb-3 text-[16px]">
          <span>Total:</span>
          <span>{ToUnitMoney(grand)}</span>
        </div>
      </div>
      <Button href="/user/checkout" text="Proceed to checkout" />
    </div>
  );
}
