"use client";
import { Container } from "@/components/common";
import React, { Fragment, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const data = [
  //   {
  //     title: "100+ Clients Served",
  //     description:
  //       "Engaged in collaboration with more than 500 digital asset issuers.",
  //   },
  {
    title: "7+ Exchanges",
    description:
      "Currently operational and actively trading on a diverse network of exchanges.",
  },
  {
    title: "24/7 Coverage",
    description:
      "Global market coverage across all exchanges, ensuring round-the-clock availability.",
  },
];

const StatusSection: React.FC = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <Fragment>
      <div className="bg-[#16234B] py-[65px]">
        <Container size="xl">
          {data.length > 0 &&
            data.map((item, index) => {
              const lastChild = data.length - 1 === index;
              return (
                <div
                  className={`flex sm:flex-row flex-col sm:gap-5 gap-[11px] sm:items-center sm:py-[61px] py-[30px] border-t border-white/15 ${
                    lastChild && "border-b"
                  }`}
                  key={index}
                >
                  <h2
                    data-aos="fade-left"
                    data-aos-easing="linear"
                    className="text-white sm:text-6xl text-[32px] sm:leading-[72px] leading-[40px] tracking-[-2.16px] font-slussen uppercase"
                  >
                    {item.title}
                  </h2>
                  <p
                    data-aos="fade-left"
                    data-aos-duration="1000"
                    className="text-[#71C2FF] text-base font-medium font-inter uppercase leading-[25.6px] tracking-[0.96px] max-w-[330px]"
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
        </Container>
      </div>
    </Fragment>
  );
};

export default StatusSection;
