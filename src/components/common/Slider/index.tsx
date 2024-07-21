"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ImageComponent } from "../index";
import CustomerData from "@/utils/data";

const Slider = () => {
  return (
    <div className="relative lg:h-[650px] md:h-[440px] h-[380px] w-full sm:px-0 px-10  flex sm:flex-row flex-row-reverse overflow-hidden">
      {/* Fixed 4.9 Card */}
      <div className="md:sticky md:top-0 z-10 h-full hidden md:block">
        <div className="relative p-[1.5px] bg-white border border-[#DEDEDE] lg:h-[571px] md:h-[384px] h-[287px] lg:pt-12 pt-6 lg:px-[90px] md:px-16">
          <div className="lg:mt-28 md:mt-10 mt-5">
            <div className="font-normal lg:text-[105px] md:text-[82px] text-7xl text-[#B3B3B3]">
              4.9
            </div>
            <div className="flex gap-1.5 justify-center md::mt-5 mt-5">
              <i className="icon-fillstar text-[#9351E8] "></i>
              <i className="icon-fillstar text-[#9351E8]"></i>
              <i className="icon-fillstar text-[#9351E8]"></i>
              <i className="icon-fillstar text-[#9351E8]"></i>
              <i className="icon-fillstar text-[#9351E8]"></i>
            </div>
            <p className="text-[#B3B3B3] font-normal text-[18px] md:mt-4 mt-5">
              44 reviews
            </p>
            <div className="flex justify-center  lg:mt-16 md:mt-10 mt-6">
              <ImageComponent
                src="/assets/images/home/Logo.png"
                fill
                figClassName="h-[40px] w-[170px]"
                className=" shrink-0 "
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      {/* Swiper Component */}
      <div className="flex flex-grow gap-0">
        <Swiper
          modules={[Pagination]}
          style={{ position: "unset" }}
          className="AtSocialSlider h-full"
          pagination={{
            clickable: true,
            type: "bullets",
            renderBullet: function (index, className) {
              return '<span class="' + className + '">' + "</span>";
            },
          }}
          spaceBetween={0}
          slidesPerView={5}
          centeredSlides={true}
          loop={true}
          direction="horizontal"
          breakpoints={{
            300: {
              direction: "vertical",
              slidesPerView: 1.5,
              spaceBetween: 0,
              centeredSlides: false, // Set centeredSlides to false for small screens
            },
            640: {
              slidesPerView: 5,
              spaceBetween: 0,
              centeredSlides: true, // Enable centeredSlides for larger screens
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 0,
              centeredSlides: true,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 0,
              centeredSlides: true,
            },
            1440: {
              slidesPerView: 5,
              spaceBetween: 0,
              centeredSlides: true,
            },
          }}
        >
          {CustomerData.slice(1).map((items, index) => (
            <SwiperSlide key={index}>
              <div className="p-[1.5px] bg-white border border-[#DEDEDE] lg:h-[571px] md:h-[384px] h-[288px] px-5 lg:pt-12 pt-3">
                <div className="xl:w-[335px] lg:w-[300px] md:w-[260px] xs:w-[290px] xs1:w-[265px]">
                  <div className="lg:h-[260px] md:h-[137px] h-[70px]">
                    <p className="text-left line-clamp-8 lg:text-3xl md:text-2xl text-lg lg:tracking-wider md:leading-[34px] font-normal">
                      {items.dec}
                    </p>
                  </div>
                  <div className="flex md:gap-x-5 gap-x-3 items-center lg:pt-[172px] md:pt-[148px] pt-[108px]">
                    <ImageComponent
                      src={items.img}
                      fill
                      figClassName="h-[48px] w-[48px]"
                      className="object-cover border-[3px] rounded-full border-[#E3E3E3]"
                      alt=""
                    />
                    <div>
                      <h3 className="text-xl text-left font-bold text-[#232323]">
                        {items.name}
                      </h3>
                      <div className="flex items-center gap-x-1">
                        <p className="text-sm truncate mt-1">Web Developer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
