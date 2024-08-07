"use client";
import React, { Fragment, useState, useEffect } from "react";
import { Container } from "@/components/common";
import Image from "next/image";

const data = [
  {
    title: "Cash-out",
    description:
      "When the market price is higher than your preset price, the bot helps you cash-out by placing sell orders on the order book. The bot uses a combo strategy of both large sell orders and small sell orders.",
    src: "  ",
  },
  {
    title: "Liquidity Support",
    description:
      "You can select a reference price source from one of the listed exchanges and the bot will link to that price. This key feature has integrated an anti-arbitrage bot to prevent your Market Making funds from other arbitrage bots.",
    src: "  ",
  },
  {
    title: "Price Support",
    description:
      "If the market price falls below the set price support, our system will automatically send you an instant notification. The bot from Liquidity Support will automatically buy up orders below the price support as price support.",
    src: "  ",
  },
];

const CashOut: React.FC = () => {
  const [lineHeight, setLineHeight] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;

      const totalScrollable = documentHeight - windowHeight;
      const scrollPercentage = (scrollPosition / totalScrollable) * 100;

      const newHeight = (scrollPercentage / 100) * 702; // 702px is the max height
      setLineHeight(newHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-white md:py-[65px] sm:py-[40px] py-[20px]">
      <Container size="xl">
        <Fragment>
          {data.length > 0 &&
            data.map((item, index) => {
              return (
                <div
                  className="flex sm:flex-row flex-col gap-16 sm:mt-0 mt-16 sm:sticky static sm:top-[65px] top-0 bg-white"
                  key={index}
                >
                  <div className="max-w-[581px] w-full relative sm:h-[702px] h-auto flex flex-col justify-between">
                    <div className="h-[150px] w-full sm:block hidden  bg-custom-gradient" />
                    <div className="">
                      <h2 className="uppercase md:text-4xl text-2xl font-slussen font-bold leading-[36px] tracking-[0.72px] text-[#0A2540]">
                        {item.title}
                      </h2>
                      <p className="text-[#56718DE5]/90 font-slussen md:text-2xl text-base leading-[38.4px] tracking-[0.34px] font-normal pt-6 max-w-[505px]">
                        {item.description}
                      </p>
                    </div>
                    <div className="h-[150px] font-slussen sm:block hidden bg-custom-gradient2 w-full" />
                  </div>
                  <div className="relative sm:block hidden w-0.5 bg-[#56718D1A]/10 h-[702px]">
                    <div
                      className="absolute top-0 w-full bg-main transition-all duration-300"
                      style={{ height: `${lineHeight}px` }}
                    />
                  </div>
                  <div className="">
                    <Image
                      src="/assets/images/landing-page/cash-out.svg"
                      alt="Cash Out"
                      height={364}
                      width={464}
                    />
                  </div>
                </div>
              );
            })}
        </Fragment>
      </Container>
    </div>
  );
};

export default CashOut;
