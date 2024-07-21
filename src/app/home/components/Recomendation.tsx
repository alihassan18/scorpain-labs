"use client";
import { ImageComponent } from "@/components/common";
import React, { useEffect } from "react";
import AOS from "aos";
import { Container } from "@/components/common/index";

export default function Recomendation() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      // offset: 200,
      easing: "ease-in-out",
    });
    window.scrollY;
  }, []);
  return (
    <div className="relative sm:mt-20 sm:pt-8 pt-5 mt-8" id="recomendation">
      <img
        src="/assets/images/home/Recomendation-bg.png"
        className="h-full w-full  md:block hidden absolute object-cover top-0 -z-30"
        alt=""
      />
      <img
        src="/assets/images/home/recomendationtablet.png"
        className="h-full w-full  md:hidden block xs:hidden absolute  top-0 -z-30"
        alt=""
      />
      <img
        src="/assets/images/home/recomendationmbl.png"
        className="h-full w-full   hidden xs:block absolute   top-0 -z-30"
        alt=""
      />
      <div
        className="flex flex-col  w-full  items-center justify-center"
        data-aos="fade-up"
      >
        <h2 className="h2 md:text-left text-center">
          Personal Recommendations
        </h2>
        <p className="font-normal lg:max-w-[1176px] sm:text-2xl text-xl text-center w-full  mt-4 sm:px-0 px-4">
          Discover personalized travel gems with Yolo Selection's Personal
          Recommendation feature. Tailored to your taste and curated by your
          circle, uncover unique experiences and hidden treasures. Seamlessly
          plan your next adventure with handpicked suggestions for
          accommodations, dining, and activities. Elevate your journey with Yolo
          Selection's personalized touch.
        </p>
      </div>
      <div className="flex flex-col lg:gap-8 gap-4  md:py-16 py-12 pb-6">
        <Container>
          <div className="flex justify-center">
            <div className="sm:rounded-3xl rounded-2xl flex items-center justify-center p-3 border border-borderColor bg-[#E3E3E3]">
              <ImageComponent
                src="https://res.cloudinary.com/dz7sec6n3/image/upload/v1720783234/static/noyxbtfflmsn1u7z6kuw.jpg"
                alt=""
                className="w-full"
                width={1027}
                height={737}
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
