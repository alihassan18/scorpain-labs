import { Container, Button } from "@/components/common";
import Link from "next/link";
import React from "react";
import { BsArrowUpRight } from "react-icons/bs";

const data = [
  {
    tier: "Tier 01",
    price: "$2500",
    list: [
      { name: "1st Month Free Trail" },
      { name: "Provided on 3 Exchanges (BitMart, KuCoin, ByBit)" },
    ],
  },
  {
    tier: "Tier 02",
    price: "$4500",
    list: [
      { name: "1st Month Free Trail" },
      {
        name: "Provided on 5 Exchanges (Bithum, KuCoin, ByBit, Spookyswap, Kraken)",
      },
    ],
  },
];

const Prices: React.FC = () => {
  return (
    <div className="bg-main py-[65px]" id="price">
      <Container size="xl">
        <h2 className="md:text-center uppercase text-white font-bold md:text-5xl text-2xl leading-[48px] tracking-[0.96px] font-slussen">
          Prices
        </h2>
        <section className="flex justify-center w-full">
          <div className="flex sm:flex-row flex-col gap-2.5 pt-8 max-w-[926px] w-full justify-center">
            {data.length > 0 &&
              data.map((item, index) => {
                return (
                  <div
                    className="bg-[#0A2540] md:p-[50px] sm:p[30px] p-8 sm:max-w-[458px] w-full flex flex-col justify-between items-center"
                    key={index}
                  >
                    <div className="">
                      <span className="text-white text-2xl font-normal font-slussen leading-[31.44px] tracking-[0.34px]">
                        {item.tier}
                      </span>
                      <h3 className="pt-8 text-[#FFD700] font-medium text-[32px] font-slussen leading-[41.92px] tracking-[0.34px]">
                        {item.price}
                      </h3>
                      <p className="font-slussen tex-white font-normal text-base leading-[20px] trracking-[-0.5px] text-white">
                        per month
                      </p>
                    </div>
                    <ul className="mt-8 list-disc text-white/90 font-slussen ml-7 space-y-4">
                      {item.list.map((listItem, listIndex) => {
                        return (
                          <li
                            key={listIndex}
                            className="text-lg font-normal leading-[23.4px] tracking-[0.34px]"
                          >
                            {listItem.name}
                          </li>
                        );
                      })}
                    </ul>
                    <Link href="/#apply">
                      <Button className="bg-secondary mt-12 font-slussen whitespace-nowrap !text-2xl tracking-[0.34px] !text-black-100 flex items-center !py-2 !px-6 rounded-none gap-8 ">
                        Try for Free <BsArrowUpRight className="text-sm" />
                      </Button>
                    </Link>
                  </div>
                );
              })}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Prices;
