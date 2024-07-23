import React, { Fragment } from "react";
import { Button } from "@/components/common";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const LiquiditySupport: React.FC = () => {
  return (
    <Fragment>
      <div className="space-y-5">
        <div className="p-5 bg-black-400 w-full max-w-[1200px] flex flex-col rounded-lg">
          <h2 className="flex text-lg text-white/70 font-semibold items-center">
            Liquidity Support{" "}
            <div className="bg-green-200 rounded-full h-max px-2 py-0.5 text-sm ml-2 text-white flex gap-1.5 items-center">
              <span className="p-1 rounded-full bg-white"></span>Live
            </div>
          </h2>
          <div className="mt-5 rounded-lg bg-black-200 p-4">
            <div className="flex lg:items-center lg:flex-row flex-col lg:justify-between items-start w-full gap-8">
              <div className="w-full space-y-5">
                <h6 className="font-medium text-white/80 text-base">
                  Sell Orders (Distance to Market Price){" "}
                  <span className="cursor-not-allowed px-5 py-1 mx-1 rounded-md bg-black-dark  text-white/80">
                    0.5%
                  </span>{" "}
                  % -{" "}
                  <span className="cursor-not-allowed px-5 py-1 mx-1 rounded-md bg-black-dark  text-white/80">
                    10
                  </span>{" "}
                  %
                </h6>
                <h6 className="font-medium text-white/80 text-base flex items-center">
                  # of Positions{" "}
                  <span className="cursor-pointer flex items-center gap-5 px-2.5 py-1 mx-1 rounded-md bg-black-dark  text-white/80">
                    20 <MdOutlineKeyboardArrowDown />
                  </span>
                  Total Amount{" "}
                  <span className="cursor-not-allowed gap-5 px-5 py-1 mx-1 rounded-md bg-black-dark  text-white/80">
                    200
                  </span>
                </h6>
              </div>
              <div className="flex gap-5">
                <Button
                  className="min-w-[200px] bg-primary disabled:opacity-50 text-white rounded-md  font-semibold py-3"
                  disabled
                >
                  Place Sell Orders
                </Button>
                <Button className="min-w-[200px] bg-red-dull disabled:opacity-50 text-white rounded-md  font-semibold py-3">
                  Cancel Sell Orders
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-5 rounded-lg bg-black-200 p-4">
            <div className="flex lg:items-center lg:flex-row flex-col lg:justify-between items-start w-full gap-8">
              <div className="w-full space-y-5">
                <h6 className="font-medium text-white/80 text-base">
                  Buy Orders (Distance to Market Price){" "}
                  <span className="cursor-not-allowed px-5 py-1 mx-1 rounded-md bg-black-dark  text-white/80">
                    0.5%
                  </span>{" "}
                  % -{" "}
                  <span className="cursor-not-allowed px-5 py-1 mx-1 rounded-md bg-black-dark  text-white/80">
                    10
                  </span>{" "}
                  %
                </h6>
                <h6 className="font-medium text-white/80 text-base flex items-center">
                  # of Positions{" "}
                  <span className="cursor-pointer flex items-center gap-5 px-2.5 py-1 mx-1 rounded-md bg-black-dark  text-white/80">
                    20 <MdOutlineKeyboardArrowDown />
                  </span>
                  Total Amount{" "}
                  <span className="cursor-not-allowed gap-5 px-5 py-1 mx-1 rounded-md bg-black-dark  text-white/80">
                    200
                  </span>
                </h6>
              </div>
              <div className="flex gap-5">
                <Button
                  className="min-w-[200px] bg-primary disabled:opacity-50 text-white rounded-md  font-semibold py-3"
                  disabled
                >
                  Place Sell Orders
                </Button>
                <Button className="min-w-[200px] bg-red-dull disabled:opacity-50 text-white rounded-md  font-semibold py-3">
                  Cancel Buy Orders
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-5 rounded-lg bg-black-200 p-4">
            <div className="flex lg:items-center lg:flex-row flex-col lg:justify-between items-start w-full gap-8">
              <div className="w-full">
                <h6 className="font-medium text-white/80 text-base">
                  System will send notification when USDT changes more than{" "}
                  <span className="cursor-not-allowed px-5 py-1 mx-1 rounded-md bg-black-dark  text-white/80">
                    200
                  </span>
                </h6>
                <p className="text-sm font-medium text-red-dull pt-5">
                  Note: System will notify in 5 minute intervals.
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
      </div>
    </Fragment>
  );
};

export default LiquiditySupport;
