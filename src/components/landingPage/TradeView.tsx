"use client";
import React, { Fragment, useState, useEffect } from "react";
import { Container } from "@/components/common";
import Image from "next/image";

const data = [
  {
    title: "Volume Support",
    description:
      "You can specify daily minimum and maximum trading volume, and the bot will trade randomly within this range with no loss besides exchange trading fees.",
    src: "  ",
  },
  {
    title: "Liquidity Support",
    description:
      "You can control the buy/sell orders on the orderbook. Anti-arbitrage protection logic is built into this bot to ensure your MM fund' safety.",
    src: "  ",
  },
  {
    title: "Instant Notification",
    description:
      "Our system will notify you when your assets change based on your settings.",
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
    <div className="bg-main py-[65px]">
      <Container size="xl">
        <Fragment>
          {data.length > 0 &&
            data.map((item, index) => {
              return (
                <div
                  className="flex sm:flex-row flex-col gap-16 sm:mt-0 mt-16 sm:sticky static sm:top-[65px] top-0 bg-main items-center"
                  key={index}
                >
                  <div className="max-w-[581px] w-full relative sm:h-[702px] h-full flex flex-col justify-between">
                    <div className="h-[150px] w-full bg-custom-gradient sm:block hidden " />
                    <div className="">
                      <h2 className="uppercase md:text-4xl text-2xl font-slussen font-bold leading-[36px] tracking-[0.72px] text-white">
                        {item.title}
                      </h2>
                      <p className="text-[#F6F9FCE5]/90 font-slussen md:text-2xl text-base leading-[38.4px] tracking-[0.34px] font-normal pt-6 max-w-[505px]">
                        {item.description}
                      </p>
                    </div>
                    <div className="h-[150px] font-slussen bg-custom-gradient2 sm:block hidden  w-full" />
                  </div>
                  <div className="relative w-0.5 bg-white/10 h-[702px] sm:block hidden">
                    <div
                      className="absolute top-0 w-full bg-white transition-all duration-300"
                      style={{ height: `${lineHeight}px` }}
                    />
                  </div>
                  <div className="">
                    <Image
                      src="/assets/images/landing-page/trade-view.svg"
                      alt="Cash Out"
                      height={364}
                      width={464}
                    />
                  </div>
                </div>
              );
            })}
          {/* <p className="text-[#56718DB2]/70 text-base font-normal font-slussen leading-[20.96px] tracking-[0.34px] max-w-[852px] pt-10">
            Note: 7 days free trial of all services. Buy 6 Months, 1 Month free.
            Buy 12 Months, 3 Months free. If any questions, email mm@mytrade.org
          </p> */}
        </Fragment>
      </Container>
    </div>
  );
};

export default CashOut;
