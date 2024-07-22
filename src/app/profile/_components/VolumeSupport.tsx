import React, { Fragment } from "react";
import { Button } from "@/components/common";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const VolumeSupport: React.FC = () => {
  return (
    <Fragment>
      <div className="p-5 bg-black-400 w-full max-w-[1200px] flex flex-col rounded-lg">
        <h2 className="flex text-lg text-white/70 font-semibold items-center">
          Volume Support{" "}
          <div className="bg-green-200 rounded-full h-max px-2 py-0.5 text-sm ml-2 text-white flex gap-1.5 items-center">
            <span className="p-1 rounded-full bg-white"></span>Live
          </div>
        </h2>
        <div className="mt-5 rounded-lg bg-black-200 p-4">
          <div className="flex lg:items-center lg:flex-row flex-col lg:justify-between items-start w-full gap-8">
            <div className="w-full space-y-5">
              <h6 className="font-medium text-white/80 text-base">
                Min Trading Volume{" "}
                <span className="cursor-not-allowed px-5 py-1 mx-1 rounded-md bg-black-dark  text-white/80">
                  15000
                </span>{" "}
                USD/day Max Trading Volume{" "}
                <span className="cursor-not-allowed px-5 py-1 mx-1 rounded-md bg-black-dark  text-white/80">
                  30000
                </span>
              </h6>
              <h6 className="font-medium text-white/80 text-base flex items-center">
                Trading Strategy{" "}
                <span className="cursor-pointer flex items-center gap-5 px-2.5 py-1 mx-1 rounded-md bg-black-dark  text-white/80">
                  Self Trade near buy 1 <MdOutlineKeyboardArrowDown />
                </span>
              </h6>
              <p className="text-sm font-medium text-orange-dark">
                Note: bot won’t activate when spread between buy 1 and sell 1
                position is less than 0.05%
              </p>
            </div>
            <div className="flex gap-5">
              <Button
                className="min-w-[200px] bg-primary disabled:opacity-50 text-white rounded-md  font-semibold py-3"
                disabled
              >
                Start
              </Button>
              <Button className="min-w-[200px] bg-red-dull disabled:opacity-50 text-white rounded-md  font-semibold py-3">
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
