import React, { Fragment } from "react";
import { Container, Button } from "@/components/common";
import Image from "next/image";
import { BsArrowUpRight } from "react-icons/bs";

const Banner: React.FC = () => {
  return (
    <Fragment>
      <div className="bg-main bg-cover">
        <div className="bg-banner py-[90px]">
          <Container size="xl" className="grid grid-cols-2 items-center">
            <h1 className="max-w-[602px] text-white text-8xl font-bold leading-[92px] font-slussen">
              Crypto Market Maker SaaS Tool
            </h1>
            <div className="flex justify-end w-full">
              <Image
                src="/assets/images/landing-page/banner-image.svg"
                alt="Banner"
                className="mr-[70px]"
                height={446}
                width={314}
              />
            </div>
          </Container>
        </div>
        <Container size="xl" className="flex items-center py-7 gap-10">
          <p className="text-lg text-white leading-[23.58px] tracking-[0.34px] font-normal font-slussen">
            Most projects fail within 6 months of listing on the secondary
            market due to arbitrage attacks and inside trading, Scorpoan-labs MM
            has the best anti-arbitrage protection to ensure your MM fund's
            safety.
          </p>
          <Button className="bg-secondary font-slussen whitespace-nowrap !text-2xl tracking-[0.34px] !text-black-100 flex items-center !py-2 !px-6 rounded-none gap-8 ">
            Get Started <BsArrowUpRight className="text-sm" />
          </Button>
        </Container>
      </div>
    </Fragment>
  );
};

export default Banner;
