import { useState } from "react";
import { Button } from "@/components/ui/button";
import Input from "../Common/Input";
import { toast } from "sonner";

export default function CouponForm({ onApply }) {
  const [code, setCode] = useState("");
  const apply = () => {
    if (!code) return;
    // Demo rules: FREESHIP (0 ship), P10 (10%), P5 (5% if total>=200k)
    const upper = code.toUpperCase();
    if (!["FREESHIP", "P10", "P5"].includes(upper)) {
      toast.error("Mã không hợp lệ");
      return;
    }
    onApply?.(upper);
  };
  return (
    <div className="flex ">
      <div>
        <Input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Coupon Code"
          className="border px-4 py-2 flex-1 "
        />
      </div>

      <div className="ml-5">
        <Button>
          Áp dụng
        </Button>
      </div>
    </div>
  );
}
