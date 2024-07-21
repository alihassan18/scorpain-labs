import { Container, ImageComponent } from "@/components/common/index";

import React from "react";

type Props = {};

const Frendsmap = (props: Props) => {
  return (
    <div className="relative" id="friendmap">
      <img
        src="/assets/images/frendsmapbg.png"
        className="h-full w-full absolute  object-cover top-0 -z-30"
        alt=""
      />
      <Container>
        <div className="text-center">
          <h1 className="h2 lg:pt-20 md:pt-[50px] pt-8">Friends map</h1>
          <p className="lg:text-2xl lg:font-normal md:text-sm md:font-normal text-xs font-normal text-[#9A9A9A] lg:pt-[30px] lg:pb-[40px] md:pt-6 md:pb-[30px] pt-4 pb-5 max-w-[904px] text-center mx-auto">
            Stay connected with Yolo Selection’s Friends Map. See friends’
            locations, plan meetups, and discover hidden gems with personalized
            travel recommendations from your trusted network.
          </p>
          <ImageComponent
            src={"/assets/images/home/frendsmap.svg"}
            width={1363}
            height={622}
          />
        </div>
      </Container>
    </div>
  );
};

export default Frendsmap;
