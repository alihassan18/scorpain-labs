import React from "react";
import { Container } from "@/components/common/index";
import { RiFileList2Line } from "react-icons/ri";

const data = [
  {
    id: 1,
    title: "Cash-out",
    description:
      "When the market price is higher than your preset price, the bot helps you cash-out by placing sell orders on the order book. The bot uses a combo strategy of both large sell orders and small sell orders.",
  },
  {
    id: 2,
    title: "Reference Price",
    description:
      "You can select a reference price source from one of the listed exchanges and the bot will link to that price. This key feature has integrated an anti-arbitrage bot to prevent your Market Making funds from other arbitrage bots.",
  },
  {
    id: 3,
    title: "Price Support",
    description:
      "If the market price falls below the set price support, our system will automatically send you an instant notification. The bot from Liquidity Support will automatically buy up orders below the price support as price support.",
  },
];
const VipServices = () => {
  return (
    <div className="relative bg-black-dull">
      <Container className="md:py-28 py-10">
        <div className="text-center">
          <h1 className="text-4xl textGradient font-semibold">
            VIP Services - $1000 USD / Service / Pair / Month
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {data.length > 0 &&
              data.map((item, index) => {
                return (
                  <div
                    className="rounded-md bg-black-200 flex flex-col items-center py-10 px-8"
                    key={index}
                  >
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
          <div className="mt-7 text-base text-white/70 font-nomral">
            Note: 7 days free trial of all services. Buy 6 Months, 1 Month free.
            Buy 12 Months, 3 Months free. If any questions, email mm@mytrade.org
          </div>
        </div>
      </Container>
    </div>
  );
};

export default VipServices;
