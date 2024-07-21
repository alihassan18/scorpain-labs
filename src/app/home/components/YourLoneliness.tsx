"use client";

import Arrow from "@/components/common/Icons/Arrow";
import { Button, Container, ImageComponent } from "@/components/common/index";
import Link from "next/link";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const YourLoneliness = () => {
  const router = useRouter();

  const useToken = Cookies.get("access_token");

  const goTo = () => {
    if (useToken) {
      router.push("/app/galleryview");
    } else {
      router.push("/auth/sign-up");
    }
  };

  return (
    <div className=" relative" id="loneliness">
      <img
        src="/assets/images/lone.png"
        className="h-full w-full absolute  top-0 -z-30"
        alt=""
      />
      <div className="relative lg:py-20 md:py-12 py-7 ">
        <div className="h-full absolute w-full"></div>
        <div className="w-full relative">
          <Container className="xs:py-5">
            <div className="max-w-[70rem] mx-auto flex flex-col items-center">
              {/* <img src="/assets/images/home/line1.svg" /> */}
              <h1 className="h2 text-center max-w-[50rem] max-auto">
                Connect. Explore. Experience.{" "}
                <span className="block">Yolo Selection</span>
              </h1>
              {/* <div className="flex justify-end mt-2">
              <img src="/assets/images/home/line2.svg" />
            </div> */}
              <p className=" text-[#9A9A9A] mt-4">
                Connect, discover, and personalize your travel with Yolo
                Selection.
              </p>

              <div className="md:w-[650px] w-full md:flex-shrink-0 relative mt-8">
                <div className="relative md:block hidden h-[400px] xs1:h-[200px] xs:h-[300px] md:h-[650px] w-full rounded-full animate-rotation-slow1">
                  <ImageComponent
                    src="/assets/images/home/circle.svg"
                    fill
                    figClassName="h-full w-full"
                    className=""
                    alt=""
                  />
                  {/* *************************** img last 1*************************** */}
                  <ImageComponent
                    src="/assets/images/new-animation/last1.svg"
                    fill
                    figClassName="img3 h-[60px] w-[60px] !absolute sm:top-[18.5rem] sm:left-[18rem]"
                    className="object-cover left-64"
                    alt=""
                  />
                  {/* *************************** img 2nd 1 *************************** */}
                  <ImageComponent
                    src="/assets/images/new-animation/2nd1.svg"
                    fill
                    figClassName="img2 h-[60px] w-[60px] !absolute top-[18.5rem] md:left-[18rem]"
                    className="object-cover top-72"
                    alt=""
                  />
                  {/* *************************** img 2nd 2 *************************** */}
                  <ImageComponent
                    src="/assets/images/new-animation/2nd2.svg"
                    fill
                    figClassName="img22 h-8 w-8 !absolute top-[19.5rem] md:left-[19rem]"
                    className="object-cover top-72"
                    alt=""
                  />
                  {/* *************************** img 2nd 3 *************************** */}
                  <ImageComponent
                    src="/assets/images/new-animation/2nd3.svg"
                    fill
                    figClassName="img23 h-[18px] w-[18px] !absolute top-[19.8rem] md:left-[19.5rem]"
                    className="object-cover top-72"
                    alt=""
                  />
                  {/* *************************** img 2nd 4 *************************** */}
                  <ImageComponent
                    src="/assets/images/new-animation/2nd4.svg"
                    fill
                    figClassName="img24 h-7 w-7 !absolute top-[19.5rem] md:left-[19rem]"
                    className="object-cover top-72"
                    alt=""
                  />
                  {/* ***************************1st img 1 *************************** */}
                  <ImageComponent
                    src="/assets/images/new-animation/1st1.svg"
                    fill
                    figClassName="img h-9 w-9 !absolute top-[19rem] sm:left-[19rem]"
                    className="object-cover"
                    alt=""
                  />
                  {/* ***************************1st img 2 *************************** */}
                  <ImageComponent
                    src="/assets/images/new-animation/1st2.svg"
                    fill
                    figClassName="img0 h-[17px] w-[17px] !absolute top-[19.7rem] sm:left-[19.5rem]"
                    className="object-cover"
                    alt=""
                  />
                  {/* ***************************1st img 3 *************************** */}
                  <ImageComponent
                    src="/assets/images/new-animation/1st3.svg"
                    fill
                    figClassName="img1 h-[26px] w-[26px] !absolute top-[19.3rem] sm:left-[19.3rem]"
                    className="object-cover"
                    alt=""
                  />
                  {/* *************************** img last 2 *************************** */}
                  <ImageComponent
                    src="/assets/images/new-animation/last2.svg"
                    fill
                    figClassName="img4 h-[60px] w-[60px] !absolute sm:top-[18.5rem] sm:left-[18rem]"
                    className="object-cover"
                    alt=""
                  />
                  {/* *************************** img last 3 *************************** */}
                  <ImageComponent
                    src="/assets/images/new-animation/last3.svg"
                    fill
                    figClassName="img5 h-[60px] w-[60px] !absolute sm:top-[18.5rem] sm:left-[18rem]"
                    className="object-cover"
                    alt=""
                  />
                  {/* *************************** img last 4 *************************** */}
                  <ImageComponent
                    src="/assets/images/new-animation/lastsmall1.svg"
                    fill
                    figClassName="img6 h-[60px] w-[60px] !absolute sm:top-[18.5rem] sm:left-[18rem]"
                    className="object-cover"
                    alt=""
                  />
                </div>
                <div className="relative md:hidden block h-[400px] w-[400px] xs:w-[300px] xs:h-[300px] mx-auto">
                  <ImageComponent
                    src="/assets/images/new-animation/main.png"
                    fill
                    figClassName="h-full w-full"
                    className=""
                    alt=""
                  />
                </div>
              </div>
              <div className=" justify-center md:flex hidden">
                <div className="xs:top-[112%] absolute top-[510px] mt-8 -translate-y-1/2 left-1/2 -translate-x-1/2 ">
                  <ImageComponent
                    src="/assets/images/home/Logo.png"
                    fill
                    figClassName="h-[57px] w-[209px]"
                    className="xs1:top-[122%] top-0 object-contain"
                    alt=""
                  />
                </div>
              </div>
              <Button
                onClick={goTo}
                className="flex gap-2 w-[360px] xs1:!w-full text-center sm:mt-12 mt-8 sm:!text-[22px] !text-xl xs:!text-lg  !py-3.5 xs1:!text-sm  sm:!py-5"
                type="submit"
              >
                {useToken ? "Dashboard" : " TRY FOR FREE"}
                <span>
                  <Arrow />
                </span>
              </Button>
              <p className="text-sm font-normal text-[#717171] mt-[10px]">
                14-day free trial, no credit card required - cancel anytime
              </p>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default YourLoneliness;
