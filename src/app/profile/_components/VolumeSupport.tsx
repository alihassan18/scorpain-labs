import React, { Fragment } from "react";
import { Button } from "@/components/common";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const VolumeSupport: React.FC = () => {
  return (
    <Fragment>
      <div className="p-5 bg-[#1E3372]  w-full max-w-[1200px] flex flex-col">
        <h2 className="flex text-lg text-yellow-700 font-semibold items-center font-slussen">
          Volume Support{" "}
          <div className="bg-green-200 h-max px-2 py-0.5 font-slussen text-sm ml-2 text-white flex gap-1.5 items-center">
            <span className="p-1 rounded-full bg-white"></span>Live
          </div>
        </h2>
        <div className="mt-5 bg-[#31488E] p-4">
          <div className="flex lg:items-center lg:flex-row py-2 flex-col lg:justify-between items-start w-full gap-8">
            <div className="w-full space-y-5">
              <h6 className="font-medium text-white/80 leading-[30px] md:leading-0 text-sm font-slussen">
                Min Trading Volume{" "}
                <span className="cursor-not-allowed px-5 py-1 mx-1 bg-blue-dark  text-white/80 font-slussen">
                  15000
                </span>{" "}
                USD/day Max Trading Volume{" "}
                <span className="cursor-not-allowed px-5 py-1 mx-1 bg-blue-dark  text-white/80 font-slussen">
                  30000
                </span>
              </h6>
              <h6 className="font-medium text-white/80 text-sm flex items-center font-slussen">
                Trading Strategy{" "}
                <span className="cursor-pointer text-sm flex items-center gap-5 px-2.5 py-1 mx-1 bg-blue-dark  text-white/80 font-slussen">
                  Self Trade near buy 1 <MdOutlineKeyboardArrowDown />
                </span>
              </h6>
              <p className="text-sm font-medium text-orange-dark font-slussen">
                Note: bot won’t activate when spread between buy 1 and sell 1
                position is less than 0.05%
              </p>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-5">
              <Button
                className="md:min-w-[200px] w-full bg-yellow-700 disabled:opacity-50 text-white rounded-none font-semibold py-3 font-slussen"
                disabled
              >
                Start
              </Button>
              <Button className="md:min-w-[200px] w-full bg-[#E93E3E] disabled:opacity-50 rounded-none text-white font-semibold py-3 font-slussen">
                Stop
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VolumeSupport;
