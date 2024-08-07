import React, { Fragment } from "react";
import { Button } from "@/components/common";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const LiquiditySupport: React.FC = () => {
  return (
    <Fragment>
      <div className="space-y-5">
        <div className="p-5  bg-[#1E3372] w-full max-w-[1200px] flex flex-col">
          <h2 className="flex text-lg text-yellow-700 font-semibold items-center font-slussen">
            Liquidity Support{" "}
            <div className="bg-green-200 h-max px-2 py-0.5 font-slussen text-sm ml-2 text-white flex gap-1.5 items-center">
              <span className="p-1 rounded-full bg-white"></span>Live
            </div>
          </h2>
          <div className="mt-5  bg-[#31488E] p-4">
            <div className="flex lg:items-center lg:flex-row flex-col lg:justify-between items-start w-full gap-8">
              <div className="w-full space-y-5">
                <h6 className="font-medium text-white/80  leading-[30px] md:leading-0 text-sm font-slussen">
                  Sell Orders (Distance to Market Price){" "}
                  <span className="cursor-not-allowed px-5 py-1 mx-1 bg-blue-dark  text-white/80 font-slussen">
                    0.5%
                  </span>{" "}
                  % -{" "}
                  <span className="cursor-not-allowed px-5 py-1 mx-1 bg-blue-dark  text-white/80 font-slussen">
                    10
                  </span>{" "}
                  %
                </h6>
                <h6 className="font-medium text-white/80 text-sm flex flex-wrap items-center font-slussen">
                  # of Positions{" "}
                  <span className="cursor-pointer flex items-center gap-5 px-2.5 py-1 mx-1 bg-blue-dark  text-white/80 font-slussen">
                    20 <MdOutlineKeyboardArrowDown />
                  </span>
                  Total Amount{" "}
                  <span className="cursor-not-allowed gap-5 px-5 py-1 mx-1 bg-blue-dark  text-white/80 font-slussen">
                    200
                  </span>
                </h6>
              </div>
              <div className="flex flex-wrap md:flex-nowrap gap-5">
                <Button
                  className="min-w-[250px] bg-yellow-700 disabled:opacity-50 text-white rounded-none  font-semibold py-3 font-slussen"
                  disabled
                >
                  Place Sell Orders
                </Button>
                <Button className="min-w-[250px] bg-[#E93E3E]  disabled:opacity-50 text-white rounded-none  font-semibold py-3 font-slussen">
                  Cancel Sell Orders
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-5  bg-[#31488E] p-4">
            <div className="flex lg:items-center lg:flex-row flex-col lg:justify-between items-start w-full gap-8">
              <div className="w-full space-y-5">
                <h6 className="font-medium text-white/80   leading-[30px] md:leading-0 text-sm font-slussen">
                  Buy Orders (Distance to Market Price){" "}
                  <span className="cursor-not-allowed px-5 py-1 mx-1 bg-blue-dark  text-white/80 font-slussen">
                    0.5%
                  </span>{" "}
                  % -{" "}
                  <span className="cursor-not-allowed px-5 py-1 mx-1 bg-blue-dark  text-white/80 font-slussen">
                    10
                  </span>{" "}
                  %
                </h6>
                <h6 className="font-medium text-white/80 text-sm flex flex-wrap items-center font-slussen">
                  # of Positions{" "}
                  <span className="cursor-pointer flex items-center gap-5 px-2.5 py-1 mx-1 bg-blue-dark  text-white/80 font-slussen">
                    20 <MdOutlineKeyboardArrowDown />
                  </span>
                  Total Amount{" "}
                  <span className="cursor-not-allowed gap-5 px-5 py-1 mx-1 bg-blue-dark  text-white/80 font-slussen">
                    200
                  </span>
                </h6>
              </div>
              <div className="flex flex-wrap md:flex-nowrap gap-5">
                <Button
                  className="min-w-[250px] bg-yellow-700 disabled:opacity-50 text-white rounded-none  font-semibold py-3 font-slussen"
                  disabled
                >
                  Place Sell Orders
                </Button>
                <Button className="min-w-[250px] bg-[#E93E3E]  disabled:opacity-50 text-white rounded-none  font-semibold py-3 font-slussen">
                  Cancel Buy Orders
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-5  bg-[#31488E] p-4">
            <div className="flex lg:items-center lg:flex-row flex-col lg:justify-between items-start w-full gap-8">
              <div className="w-full">
                <h6 className="font-medium text-white/80  leading-[30px] md:leading-0 text-sm font-slussen">
                  System will send notification when USDT changes more than{" "}
                  <span className="cursor-not-allowed px-5 py-1 mx-1 bg-blue-dark font-slussen text-white/80">
                    200
                  </span>
                </h6>
                <p className="text-sm font-medium text-red-dark pt-5 font-slussen">
                  Note: System will notify in 5 minute intervals.
                </p>
              </div>
              <div className="flex flex-wrap md:flex-nowrap gap-5">
                <Button
                  className="min-w-[250px] bg-yellow-700 disabled:opacity-50 text-white rounded-none font-slussen font-semibold py-3"
                  disabled
                >
                  Start
                </Button>
                <Button className="min-w-[250px] bg-[#E93E3E]  disabled:opacity-50 text-white rounded-none font-slussen font-semibold py-3">
                  Stop
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LiquiditySupport;
