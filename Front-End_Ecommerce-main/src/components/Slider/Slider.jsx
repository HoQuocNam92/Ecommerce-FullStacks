import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Grid } from "swiper/modules";



// eslint-disable-next-line no-unused-vars
const Slider = ({ products, Component, rows = 1 }) => {
  return (
    <Swiper
      modules={[Navigation, Autoplay, Grid]}
      slidesPerView={6}
      spaceBetween={8}
      grid={{
        rows: rows,              // số hàng muốn hiển thị
        fill: "row",          // cách lấp đầy theo hàng
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}

      navigation
      breakpoints={{
        320: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 6 },
      }}
    >
      {products?.map((product) => (
        <SwiperSlide key={product.id}>
          <Component product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
