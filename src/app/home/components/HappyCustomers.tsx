import { Slider } from "@/components/common/index";
import React from "react";

const HappyCustomers = () => {
  return (
    <div className=" relative">
      <img
        src="/assets/images/gellaryview/customerbg.png"
        className="h-full w-full absolute md:block hidden  top-0 -z-30"
        alt=""
      />
      <img
        src="/assets/images/gellaryview/customerbgtab.png"
        className="h-full w-full absolute md:hidden block   top-0 -z-30"
        alt=""
      />
      {/* <img
        src="/assets/images/gellaryview/customerbgmbl.png"
        className="h-full w-full absolute     xs:block hidden top-0 -z-30"
        alt=""
      /> */}
      <div
        className="pt-7 text-center  lg:py-20 lg:pl-[75px] md:pl-[45px] md1:pl-[45px] "
        id="reviews"
      >
        {/* <div className="bd"> */}
        <h2 className="h2 md:text-start text-center">
          Hear from ,happy customers
        </h2>
        {/* <div className="flex justify-start">
        <img className="sm:my-6 my-4" src="/assets/images/home/line3.svg" />
      </div> */}
        <p className="md:text-start text-center mt-4">
          Hear from Our Happy Travelers!
        </p>
        <div className="mt-10">
          <Slider />
        </div>
      </div>
    </div>
    // </div>
  );
};

export default HappyCustomers;
