"use client";
import React, { Fragment, useState } from "react";
import { Button } from "@/components/common";
import { IoIosInformationCircle } from "react-icons/io";
import SelectComponent from "@/components/common/Forms/SelectComponents";
import CheckBox from "@/components/common/Forms/Checkbox";
import Tooltip from "../../../components/common/ToolTip";

const selectData = [{ name: "Select" }];
const VipServices: React.FC = () => {
  const [select, setSelect] = useState("");
  return (
    <Fragment>
      <h1 className="text-4xl text-white font-semibold font-slussen">
        VIP Services
      </h1>
      <div className="space-y-5">
        <div className="p-5 bg-[#1E3372] w-full max-w-[1200px] flex flex-col">
          <h2 className="flex text-lg text-yellow-700 font-semibold items-center font-slussen">
            Reference Price{" "}
            <div className="bg-red-dull h-max px-2 py-0.5 text-sm ml-2 text-white font-slussen flex gap-1.5 items-center">
              <span className="p-1 rounded-full bg-white"></span>Stopped
            </div>
          </h2>
          <div className="mt-5  bg-[#31488E] p-4">
            <div className="flex lg:items-center lg:flex-row flex-col lg:justify-between items-start w-full gap-8">
              <div className="w-full space-y-4">
                <p className="text-sm text-white/80 font-slussen">
                  Select Reference Price Source (Supports DEXs):
                </p>
                <div className="!w-[200px]">
                  <SelectComponent
                    className="!py-3 h-max border-0 bg-blue-dark text-white font-slussen"
                    placeholder={"Select"}
                    ListBoxOptions="bg-blue-dark !mt-1 !rounded-none border-0 !py-0 font-slussen"
                    selected={select}
                    setSelected={setSelect}
                    Data={selectData}
                  />
                </div>
                <h6 className="font-medium text-white/80 text-sm flex items-center font-slussen">
                  System will send notification when market price between two
                  exchanges is greater than{" "}
                  <span className="cursor-not-allowed px-5 py-1 mx-1 bg-blue-dark  text-white/80 font-slussen">
                    5
                  </span>{" "}
                  %
                </h6>
                <p className="text-sm font-medium text-red-dark !mt-1 font-slussen">
                  Note: anti-arbitrage code will be activated once the bot is
                  live.
                </p>
              </div>
              <div className="flex flex-wrap md:flex-nowrap gap-5">
                <Button
                  className="min-w-[200px] bg-yellow-700 font-slussen disabled:opacity-50 text-white rounded-none font-semibold py-3"
                  disabled
                >
                  Place Sell Orders
                </Button>
                <Button className="min-w-[200px] bg-[#E93E3E] font-slussen disabled:opacity-50 text-white rounded-none  font-semibold py-3">
                  Cancel Sell Orders
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5  bg-[#1E3372]  w-full max-w-[1200px] flex flex-col">
          <h2 className="flex text-lg text-yellow-700 font-semibold items-center font-slussen">
            Price Support{" "}
            <div className="bg-green-200 h-max px-2 py-0.5 font-slussen text-sm ml-2 text-white flex gap-1.5 items-center">
              <span className="p-1 rounded-full bg-white"></span>Live
            </div>
          </h2>
          <div className="mt-5  bg-[#31488E] p-4">
            <div className="flex lg:items-center lg:flex-row flex-col lg:justify-between items-start w-full gap-8">
              <div className="w-full space-y-4">
                <h6 className="font-medium text-white/80 text-sm flex items-center font-slussen">
                  Set Price:{" "}
                  <span className="cursor-not-allowed px-5 py-1 mx-1 bg-blue-dark  text-white/80 font-slussen">
                    0.015
                  </span>{" "}
                  RFC/USDT
                </h6>
                <p className="text-sm font-medium text-red-dark !mt-1 font-slussen">
                  Note: System will send notification when market price falls
                  below the set price.
                </p>
                <p className="text-sm font-medium text-red-dark !mt-0 font-slussen">
                  The bot from Liquidity Support will buy up orders below the
                  set price for price support.
                </p>
              </div>
              <div className="flex flex-wrap md:flex-nowrap gap-5">
                <Button
                  className="min-w-[200px] font-slussen bg-yellow-700 disabled:opacity-50 text-white rounded-none font-semibold py-3"
                  disabled
                >
                  Start
                </Button>
                <Button className="min-w-[200px] font-slussen bg-[#E93E3E] disabled:opacity-50 text-white rounded-none font-semibold py-3">
                  Stop
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5  bg-[#1E3372]    w-full max-w-[1200px] flex flex-col">
          <h2 className="flex text-lg text-yellow-700 font-semibold items-center font-slussen">
            Cash-out{" "}
            <div className="bg-green-200 h-max px-2 py-0.5 font-slussen text-sm ml-2 text-white flex gap-1.5 items-center">
              <span className="p-1 rounded-full bg-white"></span>Live
            </div>
          </h2>
          <div className="mt-5  bg-[#31488E] p-4">
            <div className="flex lg:items-center lg:flex-row flex-col lg:justify-between items-start w-full gap-8">
              <div className="w-full space-y-4">
                <h6 className="font-medium text-white/80 text-sm flex items-center font-slussen">
                  Greater than this set price, bots will start to sell:{" "}
                  <span className="cursor-not-allowed px-5 py-1 mx-1 bg-blue-dark  text-white/80 font-slussen">
                    0.023
                  </span>{" "}
                  RFC/USDT
                </h6>
                <div className="flex flex-wrap gap-8 w-full max-w-[400px]">
                  <CheckBox
                    label={
                      <div className="flex items-center gap-3 relative">
                        <p className="text-sm font-slussen whitespace-nowrap">
                          Big sell orders
                        </p>
                        <Tooltip
                          text={
                            "Big order are set in 3 positions, ~1000U/position, placed on the sell order above the set price."
                          }
                          classNames="w-[220px] bottom-[calc(100%+10px)] !p-3 font-slussen"
                          position="top"
                        >
                          <IoIosInformationCircle className="text-lg cursor-pointer" />
                        </Tooltip>
                      </div>
                    }
                    className="!bg-black-dark border-none !rounded-none font-slussen"
                    disabled
                    labelClass="text-white/80"
                  />
                  <CheckBox
                    label={
                      <div className="flex items-center gap-3 relative">
                        <p className="text-xs font-slussen whitespace-nowrap">
                          Small sell orders
                        </p>
                        <Tooltip
                          text={
                            "Small order are set in to ~100U, placed on the sell order above the set price."
                          }
                          classNames="w-[220px] bottom-[calc(100%+10px)] !p-3 font-slussen"
                          position="top"
                        >
                          <IoIosInformationCircle className="text-lg cursor-pointer" />
                        </Tooltip>
                      </div>
                    }
                    className="border-none !rounded-none !bg-blue-dark font-slussen"
                    disabled
                    checked
                    labelClass="text-white/80"
                  />
                </div>
                <h6 className="font-medium text-white/80 text-sm flex items-center font-slussen">
                  System will send notification when sold over{" "}
                  <span className="cursor-not-allowed px-5 py-1 mx-1 bg-blue-dark  text-white/80 font-slussen">
                    500
                  </span>{" "}
                  USD
                </h6>
              </div>
              <div className="flex flex-wrap md:flex-nowrap gap-5">
                <Button
                  className="min-w-[200px] bg-yellow-700 disabled:opacity-50 text-white rounded-none font-slussen font-semibold py-3"
                  disabled
                >
                  Start
                </Button>
                <Button className="min-w-[200px] bg-[#F24848]  disabled:opacity-50 text-white rounded-none font-slussen font-semibold py-3">
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

export default VipServices;
