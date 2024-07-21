"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button, Container } from "@/components/common/index";
import Arrow from "@/components/common/Icons/Arrow";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const Banner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const router = useRouter();
  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setShowControls(true);
    }
  };

  const handlePlay = () => {
    setPlaying(true);
    setShowControls(true);
  };

  const useToken = Cookies.get("access_token");

  const goTo = () => {
    if (useToken) {
      router.push("/app/galleryview");
    } else {
      router.push("/auth/sign-up");
    }
  };

  return (
    // <div className="bg-[url('/assets/images/home/banner-img.svg')]">
    <div className="relative min-h-[600px] sm:min-h-[800px]">
      <video
        autoPlay
        muted
        loop
        controls={false}
        className="h-full !w-[100vw] absolute object-cover top-0"
      >
        <source src="https://res.cloudinary.com/dz7sec6n3/video/upload/w_1920/v1720783239/static/cdpbyyz7w6ppvoz5pao6.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/30"></div>
      <Container className="relative min-h-[600px] sm:min-h-[800px] flex justify-center items-center">
        <div className="">
          <h1 className="h1 sm:leading-[65px] lg:leading-[88px] capitalize text-center max-w-[1175px] mx-auto text-white">
            Welcome to the yolo selection discover the world’s{" "}
            <span className="md:block">best-kept secrets</span>
            {/* <span className="block text-[#CAA7FF]"> your friends</span> */}
          </h1>

          <p className="text-center sm:mt-5 mt-4 capitalize sm:text-xl text-base text-white font-medium">
            you only live once.make every journey unforgettable.
          </p>
          <div className="flex justify-center items-center">
            <Button
              onClick={goTo}
              className="flex gap-2 w-[360px] xs:w-full text-center sm:mt-10 mt-8 sm:!text-[22px] !text-xl xs:!text-lg !py-4 xs:!py-3 lg:!py-5"
              type="submit"
            >
              {useToken ? "Dashboard" : " TRY FOR FREE"}

              <span>
                <Arrow />
              </span>
            </Button>
          </div>
          {/* <div className="relative  lg:mt-[7.438rem] md:mt-[5rem] sm:mt-[3rem] mt-8">
            <video
              ref={videoRef}
              controls={showControls}
              onPlay={handlePlay}
              className="w-full rounded-[1.25rem]"
              src="/assets/images/home/banner.mov"
            ></video>
            {!playing && (
              <button
                onClick={playVideo}
                className="w-10 xs:w-20 sm:w-24 hover:opacity-60 transition-all absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
              >
                <img
                  className="w-full object-contain"
                  src="/assets/images/home/play.svg"
                  alt=""
                />
              </button>
            )}
          </div> */}
        </div>
      </Container>
    </div>
  );
};

export default Banner;
