import { Container } from "@/components/common";
import Icon1 from "@/components/common/Icons/Icon1";
import Icon10 from "@/components/common/Icons/Icon10";
import Icon11 from "@/components/common/Icons/Icon11";
import Icon12 from "@/components/common/Icons/Icon12";
import Icon13 from "@/components/common/Icons/Icon13";
import Icon14 from "@/components/common/Icons/Icon14";
import Icon15 from "@/components/common/Icons/Icon15";
import Icon16 from "@/components/common/Icons/Icon16";
import Icon17 from "@/components/common/Icons/Icon17";
import Icon18 from "@/components/common/Icons/Icon18";
import Icon19 from "@/components/common/Icons/Icon19";
import Icon2 from "@/components/common/Icons/Icon2";
import Icon20 from "@/components/common/Icons/Icon20";
import Icon21 from "@/components/common/Icons/Icon21";
import Icon3 from "@/components/common/Icons/Icon3";
import Icon4 from "@/components/common/Icons/Icon4";
import Icon5 from "@/components/common/Icons/Icon5";
import Icon6 from "@/components/common/Icons/Icon6";
import Icon7 from "@/components/common/Icons/Icon7";
import Icon8 from "@/components/common/Icons/Icon8";
import Icon9 from "@/components/common/Icons/Icon9";
import Image from "next/image";
import React from "react";

const data = [
  { name: "", src: "/assets/images/icons/Figure.svg" },
  { name: "", src: "/assets/images/icons/Figure-1.svg" },
  { name: "", src: "/assets/images/icons/Figure-2.svg" },
  { name: "", src: "/assets/images/icons/Figure-3.svg" },
  { name: "", src: "/assets/images/icons/Figure-4.svg" },
  { name: "", src: "/assets/images/icons/Figure-5.svg" },
  { name: "", src: "/assets/images/icons/Figure-6.svg" },
  { name: "", src: "/assets/images/icons/Figure-7.svg" },
  { name: "", src: "/assets/images/icons/Figure-8.svg" },
  { name: "", src: "/assets/images/icons/Figure-9.svg" },
  { name: "", src: "/assets/images/icons/Figure-10.svg" },
  { name: "", src: "/assets/images/icons/Figure-11.svg" },
  { name: "", src: "/assets/images/icons/Figure-12.svg" },
  { name: "", src: "/assets/images/icons/Figure-13.svg" },
  { name: "", src: "/assets/images/icons/Figure-14.svg" },
  { name: "", src: "/assets/images/icons/Figure-15.svg" },
  { name: "", src: "/assets/images/icons/Figure-16.svg" },
  { name: "", src: "/assets/images/icons/Figure-17.svg" },
  { name: "", src: "/assets/images/icons/Figure-18.svg" },
  { name: "", src: "/assets/images/icons/Figure-19.svg" },
  { name: "", src: "/assets/images/icons/Figure-20.svg" },
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
