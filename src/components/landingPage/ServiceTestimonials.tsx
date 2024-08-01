"use client";
import React, { useRef } from "react";
import { Button, Container } from "@/components/common";
import Image from "next/image";

const data = [
  {
    id: "01",
    src: "/assets/images/landing-page/man1.svg",
    title: "Founder of SCY",
    description:
      "MyTrade was incredibly helpful with setup and onboarding, providing valuable insights into MM. They continued to support us, explaining notifications and addressing concerns.",
  },
  {
    id: "02",
    src: "/assets/images/landing-page/man1.svg",
    title: "Founder of a BitMart project",
    description:
      "MyTrade offers user-friendly and convenient mechanic tools that are incredibly useful. One major benefit is its ability to prevent price swings from attackers and bots, a task difficult to manage manually.",
  },
  {
    id: "03",
    src: "/assets/images/landing-page/man1.svg",
    title: "Founder of SCY",
    description:
      "MyTrade provided excellent setup assistance and onboarding explanations. Our conversations significantly enhanced my understanding of MM.",
  },
];

const ServiceTestimonials: React.FC = () => {
  return (
    <div className="bg-main bg-opacity-[2%] py-[65px]" id="testimonial">
      <Container size="xl">
        <h2 className="text-[#0A2540] md:text-5xl sm:text-4xl text-2xl font-bold font-slussen leading-[48px] tracking-[0.96px]">
          Testimonials
        </h2>
        <p className="max-w-[992px] sm:text-2xl text-lg font-normal font-slussen leading-[38.4px] tracking-[0.34px] text-[#56718D] pt-4">
          What People Are Saying About Us
        </p>
        <div className="sm:my-20 py-10 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {data.length > 0 &&
            data.map((item, index) => {
              return (
                <div key={index} className="w-full">
                  <div className="bg-main px-12 py-14 h-full">
                    <div className="flex justify-between">
                      <Image
                        src={item.src}
                        alt={item.title}
                        height={60}
                        width={64}
                      />
                      <span className="font-slussen text-white font-normal text-base leading-[25.6px] tracking-[0.22px]">
                        {item.id}
                      </span>
                    </div>
                    <div className="flex flex-col gap-12">
                      <h3 className="max-w-[358px] text-white  mt-8 font-slussen text-2xl font-normal leading-[31.44px] tracking-[0.34px]">
                        {item.title}
                      </h3>
                      <p className="font-normal text-white/90 font-slussen leading-[23.58px] tracking-[0.34px] text-lg">
                        {item.description}
                      </p>
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

export default ServiceTestimonials;
