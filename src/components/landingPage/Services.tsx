"use client";
import React, { useRef } from "react";
import { Button, Container } from "@/components/common";
import Image from "next/image";
import { BsArrowUpRight } from "react-icons/bs";
import Link from "next/link";

const data = [
  {
    id: "01",
    src: "/assets/images/landing-page/market-making.svg",
    title: "Market Making",
    description:
      "Enhance the liquidity of your token through tailored algorithmic trading strategies that have a positive impact on your project.",
  },
  {
    id: "02",
    src: "/assets/images/landing-page/advisory-services.svg",
    title: "Advisory Services",
    description:
      "Verified token launch strategies, Tokenomics guidance, and tailored advisory services for projects at all stages.",
  },
  {
    id: "03",
    src: "/assets/images/landing-page/exchange-listing.svg",
    title: "Exchange Listing",
    description:
      "We offer a streamlined listing process with premium partner exchanges for cost-effective and expedited results.",
  },
];

const Services: React.FC = () => {
  // const prevRef = useRef<HTMLButtonElement>(null);
  // const nextRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="bg-main bg-opacity-[2%] md:py-[50px] py-8">
      <Container size="xl">
        <h2 className="text-[#0A2540] md:text-5xl text-2xl font-bold font-slussen leading-[48px] tracking-[0.96px]">
          Services
        </h2>
        <p className="max-w-[992px] md:text-2xl text-base font-normal font-slussen leading-[38.4px] tracking-[0.34px] text-[#56718D] pt-2">
          Scorpian Labs offers comprehensive solutions for digital asset issuers
          at all stages.
        </p>
        <div className="my-16 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {data.length > 0 &&
            data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="sm:max-w-[458px] w-full max-w-full overflow-hidden group"
                >
                  <div className="bg-main p-12 h-full flex-grow">
                    <div className="flex justify-between">
                      <Image
                        src={item.src}
                        alt={item.title}
                        height={72}
                        width={72}
                      />
                      <span className="font-slussen text-white font-normal text-base leading-[25.6px] tracking-[0.22px]">
                        {item.id}
                      </span>
                    </div>
                    <div className="flex flex-col mt-4">
                      <h3 className="max-w-[163px] text-white font-slussen text-2xl font-normal leading-[31.44px] tracking-[0.34px]">
                        {item.title}
                      </h3>
                      <p className="font-normal mt-8 text-white/90 font-slussen leading-[23.58px] tracking-[0.34px] text-lg">
                        {item.description}
                      </p>
                    </div>
                    <div className="relative top-[100%] group-hover:top-0 duration-300">
                      <Link href="/#apply">
                        <Button className="bg-secondary !w-full mt-8 font-slussen whitespace-nowrap !text-2xl tracking-[0.34px] !text-black-100 flex items-center !py-2 !px-6 rounded-none gap-8 ">
                          Get in Touch <BsArrowUpRight className="text-sm" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </Container>
    </div>
  );
};

export default Services;
