import React, { useEffect, useState } from "react";
import useProduct from "@/hooks/useProduct";
// import ProductSale from "./ProductSale";
import ProductList from "@/components/Common/ProductList";
import Slider from "../Slider/Slider";
import useFlashSale from "@/hooks/useFlashSale";
import { Spinner } from "@/components/ui/spinner";
const FlashSales = () => {
  const { productSale, isLoading } = useFlashSale();
  const [flash, setFlash] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });




  useEffect(() => {
    const endTime = new Date();
    endTime.setDate(endTime.getDate() + 2);

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = endTime - now;

      if (distance <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  if (isLoading) {
    return <Spinner />
  }
  return (
    <section className="mt-[140px]">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8 flex-wrap">
        <div>
          <div className="flex items-center gap-2 text-red-700 font-semibold">
            <div className="w-[10px] h-5 bg-red-700 rounded-sm" />
            Hôm nay
          </div>
          <h2 className="text-[36px] font-semibold mt-2">
            Giảm giá sập sàn
          </h2>
        </div>

        {/* COUNTDOWN */}
        <div className="flex gap-6 text-center">
          {["Days", "Hours", "Minutes", "Seconds"].map((label, index) => {
            const value = [
              timeLeft.days,
              timeLeft.hours,
              timeLeft.minutes,
              timeLeft.seconds,
            ][index];

            return (
              <div key={label}>
                <div className="text-2xl font-bold">
                  {String(value).padStart(2, "0")}
                </div>
                <div className="text-xs text-gray-500">
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Slider products={productSale} Component={ProductList} />
    </section>
  );
};

export default FlashSales;
