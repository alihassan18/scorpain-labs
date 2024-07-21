"use client";
import { ImageComponent } from "@/components/common";
import React, { useEffect } from "react";
import AOS from "aos";
import Pointofintrestcards from "@/components/ui/Pointofintrestcards/Pointofintrestcards";
import { Container } from "@/components/common/index";

export default function PointofInterest() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      // offset: 200,
      easing: "ease-in-out",
    });
    window.scrollY;
  }, []);
  return (
    <div className="relative sm:pb-20 pb-10  border border-white lg:h-[910px] md:h-[1130px]">
      <Container className="flex lg:flex-row flex-col justify-between items-center gap-5 lg:mt-20 mt-12 xs: mt-8">
        <div
          className="sm:rounded-[23px] order-2 lg:order-1 max-w-[305px]  h-[205px]  sm:max-w-[650px] sm:h-[475px] rounded-[16px] p-3 border border-[#E3E3E3]  bg-[#E3E3E3]"
          data-aos="fade-right"
        >
          <img
            src="https://res.cloudinary.com/dz7sec6n3/image/upload/v1720783234/static/c3gznjutvbtocsjxaofu.jpg"
            className="  w-full flex-shrink-0  rounded-[20px] h-full "
          />
        </div>

        <div className="  order-1 lg:order-2 " data-aos="fade-left">
          <h2 className="h2 ">Point of Interests</h2>
          <p className="font-normal  md:max-w-[550px] sm:mt-0 mt-2  w-full ">
            Welcome to the heart of extraordinary travel experiences.Yolo
            Selection presents handpicked gems worldwide, curated for those who
            crave adventure and seek the exceptional. From iconic landmarks to
            hidden treasures, explore the world's best destinations with us and
            make every journey unforgettable.
          </p>
        </div>
      </Container>
      <div className=" md:mt-14 mt-10">
        <Pointofintrestcards />
      </div>
    </div>
  );
}
