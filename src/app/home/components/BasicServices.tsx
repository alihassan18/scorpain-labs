import React from "react";
import { Container } from "@/components/common/index";
import { RiFileList2Line } from "react-icons/ri";

const data = [
  {
    id: 1,
    icon: <RiFileList2Line />,
    title: "Volume Support",
    description:
      "You can specify daily minimum and maximum trading volume, and the bot will trade randomly within this range with no loss besides exchange trading fees.",
  },
  {
    id: 2,
    icon: <RiFileList2Line />,
    title: "Liquidity Support",
    description:
      "You can control the buy/sell orders on the orderbook. Anti-arbitrage protection logic is built into this bot to ensure your MM fund' safety.",
  },
  {
    id: 3,
    icon: <RiFileList2Line />,
    title: "Instant Notification",
    description:
      "Our system will notify you when your assets change based on your settings.",
  },
];
const BasicServices = () => {
  return (
    <div className="relative bg-black-mid" id="about">
      <Container className="md:py-28 py-10">
        <div className="text-center">
          <h1 className="text-4xl textGradient font-semibold">
            Basic Services - $2500 USD - $4500 USD / Pair / Month
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {data.length > 0 &&
              data.map((item, index) => {
                return (
                  <div
                    className="rounded-md bg-black-200 flex flex-col items-center py-10 px-8"
                    key={index}
                  >
                    <span className="flex justify-center items-center text-4xl h-16 w-16 rounded-full text-white bg-black-mid">
                      {item.icon}
                    </span>
                    <h3 className="font-semibold text-2xl text-white mt-5">
                      {item.title}
                    </h3>
                    <p className="text-base font-normal text-white/50 mt-8">
                      {item.description}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BasicServices;
