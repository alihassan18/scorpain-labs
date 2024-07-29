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
    <div className="bg-white py-[65px]">
      <Container size="xl">
        <Fragment>
          {data.length > 0 &&
            data.map((item, index) => {
              return (
                <div
                  className="flex gap-16 sticky top-[65px] bg-white"
                  key={index}
                >
                  <div className="max-w-[581px] w-full relative h-[702px] flex flex-col justify-between">
                    <div className="h-[150px] w-full bg-custom-gradient" />
                    <div className="">
                      <h2 className="uppercase text-4xl font-slussen font-bold leading-[36px] tracking-[0.72px] text-[#0A2540]">
                        {item.title}
                      </h2>
                      <p className="text-[#56718DE5]/90 font-slussen text-2xl leading-[38.4px] tracking-[0.34px] font-normal pt-6 max-w-[505px]">
                        {item.description}
                      </p>
                    </div>
                    <div className="h-[150px] font-slussen bg-custom-gradient2 w-full" />
                  </div>
                  <div className="relative w-0.5 bg-[#56718D1A]/10 h-[702px]">
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
          <p className="text-[#56718DB2]/70 text-base font-normal font-slussen leading-[20.96px] tracking-[0.34px] max-w-[852px] pt-10">
            Note: 7 days free trial of all services. Buy 6 Months, 1 Month free.
            Buy 12 Months, 3 Months free. If any questions, email mm@mytrade.org
          </p>
        </Fragment>
      </Container>
    </div>
  );
};

export default CashOut;
