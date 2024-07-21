import ImageComponent from "@/components/common/ImageComponent";
import { PointofIntrestData } from "@/utils/pointofintrestcards";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

type Props = {};

const Pointofintrestcards = (props: Props) => {
  return (
    <div className="">
      <Swiper
        modules={[Pagination]}
        style={{ position: "unset" }}
        className="AtSocialSlider1 h-full"
        pagination={{
          clickable: true,
          type: "bullets",
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + "</span>";
          },
        }}
        spaceBetween={0}
        slidesPerView={6}
        centeredSlides={true}
        loop={true}
        direction="horizontal"
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 0,
            centeredSlides: true, // Enable centeredSlides for larger screens
          },
          500: {
            slidesPerView: 1.8,
            spaceBetween: 0,
            centeredSlides: true, // Enable centeredSlides for larger screens
          },
          600: {
            slidesPerView: 2.3,
            spaceBetween: 0,
            centeredSlides: true, // Enable centeredSlides for larger screens
          },
          768: {
            slidesPerView: 2.8,
            spaceBetween: 0,
            centeredSlides: true,
          },
          920: {
            slidesPerView: 3,
            spaceBetween: 0,
            centeredSlides: true,
          },
          1024: {
            slidesPerView: 3.8,
            spaceBetween: 0,
            centeredSlides: true,
          },
          1085: {
            slidesPerView: 4.2,
            spaceBetween: 0,
            centeredSlides: true,
          },
          1460: {
            slidesPerView: 5.5,
            spaceBetween: 0,
            centeredSlides: true,
          },
          1590: {
            slidesPerView: 6.2,
            spaceBetween: 0,
            centeredSlides: true,
          },
        }}
      >
        {/*  */}
        {PointofIntrestData.slice(1).map((items, index) => (
          <SwiperSlide key={index}>
            <div className="flex items-center md:justify-start justify-center">
              <div className="border border-[#E1E1E1] bg-white rounded-[20px]">
                <ImageComponent
                  src={items.img}
                  figClassName="w-[250px] h-[180px] "
                  fill
                  className="!flex-shrink-0 rounded-none"
                />
                <p className="text-[#000000] md:w-auto font-normal text-lg py-5 text-center  w-full ">
                  {items.name}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Pointofintrestcards;

{
  /* <div className="flex items-center md:flex-nowrap flex-wrap md:justify-start justify-center md:gap-5 gap-4">
                <div className="">
                  <ImageComponent
                    src={items.img}
                    figClassName="w-60 h-44 bd !flex-shrink-0"
                    fill
                    // width={199}
                    // height={199}
                    className="!flex-shrink-0"
                  />
                  <p className="text-[#000000] w-full md:w-auto md:text-start text-center">
                    {items.name}
                  </p>
                </div>
              </div> */
}
