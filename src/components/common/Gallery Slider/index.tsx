"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ImageComponent from "../ImageComponent/index";
const Slider = ({ poi }: { poi: any }) => {
  return (
    <div className="rounded-larg overflow-hidden relative flex justify-center items-center">
      <Swiper
        modules={[Navigation]}
        navigation={poi?.images?.length > 1 ? true : false}
        style={{ position: "unset" }}
        className="AtSocialSlider bg-white w-full h-full"
        spaceBetween={0}
        slidesPerView={1}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
        }}
      >
        {poi?.images?.length > 0 ? (
          poi?.images?.map((e: any, index: number) => (
            <SwiperSlide key={index}>
              <ImageComponent
                src={e}
                fill
                // height={425.48}
                // width={900}
                figClassName="h-[500px] w-full"
                className="w-full object-cover"
              />
            </SwiperSlide>
          ))
        ) : (
          <ImageComponent
            src={"/assets/images/placeholder.png"}
            fill
            // height={425.48}
            // width={900}
            figClassName="h-[500px] w-full"
            className="w-full object-cover"
          />
        )}
      </Swiper>
    </div>
  );
};
export default Slider;
