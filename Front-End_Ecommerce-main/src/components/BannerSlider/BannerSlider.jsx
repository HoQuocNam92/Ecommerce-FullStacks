import { Spinner } from "@/components/ui/spinner";
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from "swiper/modules";
const BannerSlider = ({ banners }) => {

  if (banners?.isLoading) return <Spinner />
  return (
    <div  >

      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,

        }}
        className="mySwiper"
      >

        {banners?.data?.res?.map(x => (

          <SwiperSlide>
            <img className="w-full" src={x.image_url} alt="" />
          </SwiperSlide>
        )

        )}

      </Swiper>
    </div >
  );
};

export default BannerSlider;
