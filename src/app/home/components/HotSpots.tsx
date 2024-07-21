"use client";
import { Container, ImageComponent } from "@/components/common";
import React, { useEffect } from "react";
import AOS from "aos";

export default function HotSpots() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out-back",
    });
  }, []);
  return (
    <div className=" lg:mt-[6.375rem] mt-[4rem] xs:mt-[2rem] Imagesize">
      <Container className="flex lg:flex-row flex-col justify-between items-center gap-5">
        <div className=" " data-aos="fade-right">
          <h2 className="h2 ">Jet Set hot spots</h2>
          <p className="font-normal  md:max-w-[550px] sm:mt-0 mt-2  w-full ">
            Discover the epitome of high end with Yolo Selection's Jet Set Hot
            Spots. Curated from top reviews and personalized for you, explore
            the world's finest destinations with friends and influencers you
            trust.
          </p>
        </div>
        <div
          className="sm:rounded-[23px] max-w-[305px]  h-[205px]  sm:max-w-[650px] sm:h-[463px] rounded-[16px] p-3 border border-[#E3E3E3]  bg-[#E3E3E3]"
          data-aos="fade-left"
        >
          <img
            src="/assets/images/home/hotspot1.png"
            className="w-full h-full rounded-[20px] relative flex-shrink-0"
          />
        </div>
      </Container>
    </div>
  );
}
