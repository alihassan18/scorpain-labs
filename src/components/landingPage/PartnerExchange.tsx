import { Container } from "@/components/common";
import Image from "next/image";
import React from "react";

const data = [
  { name: "", src: "/assets/images/landing-page/icons/Figure.svg" },
  { name: "", src: "/assets/images/landing-page/icons/Figure-1.svg" },
  { name: "", src: "/assets/images/landing-page/icons/Figure-2.svg" },
  { name: "", src: "/assets/images/landing-page/icons/Figure-3.svg" },
  { name: "", src: "/assets/images/landing-page/icons/Figure-4.svg" },
  { name: "", src: "/assets/images/landing-page/icons/Figure-5.svg" },
  { name: "", src: "/assets/images/landing-page/icons/Figure-6.svg" },
  { name: "", src: "/assets/images/landing-page/icons/Figure-7.svg" },
  { name: "", src: "/assets/images/landing-page/icons/Figure-8.svg" },
  { name: "", src: "/assets/images/landing-page/icons/Figure-9.svg" },
  { name: "", src: "/assets/images/landing-page/icons/Figure-10.svg" },
  { name: "", src: "/assets/images/landing-page/icons/Figure-11.svg" },
  { name: "", src: "/assets/images/landing-page/icons/Figure-12.svg" },
  { name: "", src: "/assets/images/landing-page/icons/Figure-13.svg" },
  { name: "", src: "/assets/images/landing-page/icons/Figure-14.svg" },
  { name: "", src: "/assets/images/landing-page/icons/Figure-15.svg" },
  { name: "", src: "/assets/images/landing-page/icons/Figure-16.svg" },
  { name: "", src: "/assets/images/landing-page/icons/Figure-17.svg" },
  { name: "", src: "/assets/images/landing-page/icons/Figure-18.svg" },
  { name: "", src: "/assets/images/landing-page/icons/Figure-19.svg" },
  { name: "", src: "/assets/images/landing-page/icons/Figure-20.svg" },
];
const PartnerExchange = () => {
  return (
    <>
      <div className="sm:py-40 py-20">
        <h1 className="text-center font-slussen sm:text-5xl text-2xl font-bold">
          Partner Exchanges
        </h1>
        <Container size="xl" className="flex justify-center w-full">
          <div className="max-w-[1114.44px] w-full grid md:grid-cols-7 sm:grid-cols-5 grid-cols-3 sm:mt-28 mt-16">
            {data.length > 0 &&
              data.map((item, index) => {
                return (
                  <div className="space-y-1 flex justify-center" key={index}>
                    <Image
                      src={item.src}
                      alt={item.name}
                      height={101}
                      width={115}
                    />
                  </div>
                );
              })}
          </div>
        </Container>
      </div>
    </>
  );
};

export default PartnerExchange;
