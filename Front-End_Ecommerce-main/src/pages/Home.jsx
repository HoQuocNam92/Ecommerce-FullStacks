import BannerSlider from "@/components/BannerSlider/BannerSlider";
import BestSelling from "@/components/BestSelling/BestSelling";
import FlashSale from "@/components/FlashSale/FlashSale";
import NewArrival from "@/components/NewArrival/NewArrival";
import RecentlyViewed from "@/components/ProductGrid/RecentlyViewed";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
import PromoBanner from "@/components/PromoBanner/PromoBanner";
import React from "react";
import useProduct from "@/hooks/useProduct";
import useBanner from "@/hooks/useBanner";

const Home = () => {
  const { products, setPages, pages, totalPages, productGridRef } = useProduct();

  const { getAllBanner } = useBanner();
  return (
    <div className="container">
      <BannerSlider banners={getAllBanner} />
      <FlashSale />
      <BestSelling />
      <PromoBanner />
      <ProductGrid value={{ products, setPages, pages, totalPages, productGridRef }} />
      <RecentlyViewed />
      {/* <NewArrival /> */}
    </div>
  );
};

export default Home;
