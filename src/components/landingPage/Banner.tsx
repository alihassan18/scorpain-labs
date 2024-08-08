import React, { Fragment } from "react";
import { Container, Button } from "@/components/common";
import { BsArrowUpRight } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

const Banner: React.FC = () => {
  return (
    <Fragment>
      <div className="bg-main bg-cover bg-no-repeat">
        <div className="sm:bg-banner lg:py-[90px] md:py-[70px] sm:py-[50px] py-5">
          <Container
            size="xl"
            className="grid lg:grid-cols-2 grid-cols-1 items-center"
          >
            <h1 className="sm:max-w-[602px] max-w-full text-white sm:text-8xl text-[28px] font-bold sm:leading-[92px] !uppercase font-slussen">
              Crypto Market Maker SaaS Tool
            </h1>
            <div className="flex animate justify-end w-full">
              <Image
                src="/assets/images/landing-page/banner-image.svg"
                alt="Banner"
                className="mr-[70px] md:block hidden"
                height={446}
                width={314}
              />
              <Image
                src="/assets/images/login/login-banner.svg"
                alt="Banner"
                className="block sm:hidden !w-full height-ato animate"
                height={446}
                width={314}
              />
            </div>
          </Container>
        </div>
        <Container
          size="xl"
          className="flex sm:flex-row flex-col items-center py-7 gap-10"
        >
          <p className="text-lg text-white leading-[23.58px] tracking-[0.34px] font-normal font-slussen">
            Most projects fail within 6 months of listing on the secondary
            market due to arbitrage attacks and inside trading, Scorpoan-labs MM
            has the best anti-arbitrage protection to ensure your MM fund's
            safety.
          </p>
          <Link href="/#apply">
            <Button className="bg-secondary sm:w-auto w-full font-slussen whitespace-nowrap !text-2xl tracking-[0.34px] !text-black-100 flex items-center !py-2 !px-6 rounded-none gap-8 ">
              Get Started <BsArrowUpRight className="text-sm" />
            </Button>
          </Link>
        </Container>
      </div>
    </Fragment>
  );
};

export default Banner;
