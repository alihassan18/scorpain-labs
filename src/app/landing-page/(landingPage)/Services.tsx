"use client";
import React, { useRef } from "react";
import { Container } from "@/components/common";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css/navigation";
import "swiper/css/pagination";

const data = [
  {
    id: "01",
    src: "/assets/images/landing-page/market-making.svg",
    title: "Market Making",
    description:
      "Enhance the liquidity of your token through tailored algorithmic trading strategies that have a positive impact on your project.",
  },
  {
    id: "02",
    src: "/assets/images/landing-page/advisory-services.svg",
    title: "Advisory Services",
    description:
      "Verified token launch strategies, Tokenomics guidance, and tailored advisory services for projects at all stages.",
  },
  {
    id: "03",
    src: "/assets/images/landing-page/exchange-listing.svg",
    title: "Exchange Listing",
    description:
      "We offer a streamlined listing process with premium partner exchanges for cost-effective and expedited results.",
  },
];

const Services: React.FC = () => {
  // const prevRef = useRef<HTMLButtonElement>(null);
  // const nextRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="bg-main bg-opacity-[2%] py-[65px]">
      <Container size="xl" className="!pr-0">
        <h2 className="text-[#0A2540] text-5xl font-bold font-slussen leading-[48px] tracking-[0.96px]">
          Services
        </h2>
        <p className="max-w-[992px] text-2xl font-normal font-slussen leading-[38.4px] tracking-[0.34px] text-[#56718D] pt-4">
          Scorpian Labs offers comprehensive solutions for digital asset issuers
          at all stages.
        </p>
        <div className="my-20">
          <Swiper
            spaceBetween={24}
            navigation={true}
            modules={[Navigation]}
            // navigation={{
            //   prevEl: prevRef.current,
            //   nextEl: nextRef.current,
            // }}
            // modules={[Navigation]}
            className="mySwiper !overflow-visible handle-navigation"
            // onBeforeInit={(swiper) => {
            //   if (
            //     swiper.params.navigation &&
            //     typeof swiper.params.navigation !== "boolean"
            //   ) {
            //     swiper.params.navigation.prevEl = prevRef.current;
            //     swiper.params.navigation.nextEl = nextRef.current;
            //   }
            // }}
          >
            {data.length > 0 &&
              data.map((item, index) => {
                return (
                  <SwiperSlide key={index} className="max-w-[458px] h-[630px]">
                    <div className="bg-main p-12 h-[630px]">
                      <div className="flex justify-between">
                        <Image
                          src={item.src}
                          alt={item.title}
                          height={72}
                          width={72}
                        />
                        <span className="font-slussen text-white font-normal text-base leading-[25.6px] tracking-[0.22px]">
                          {item.id}
                        </span>
                      </div>
                      <div className="flex flex-col gap-12 mt-28">
                        <h3 className="max-w-[163px] text-white font-slussen text-2xl font-normal leading-[31.44px] tracking-[0.34px]">
                          {item.title}
                        </h3>
                        <p className="font-normal text-white/90 font-slussen leading-[23.58px] tracking-[0.34px] texy-lg">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </Container>
    </div>
  );
};

export default Services;
