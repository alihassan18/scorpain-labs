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
      <h1 className="text-4xl text-primary font-semibold">VIP Services</h1>
      <div className="space-y-5">
        <div className="p-5 bg-black-400 w-full max-w-[1200px] flex flex-col rounded-lg">
          <h2 className="flex text-lg text-primary/70 font-semibold items-center">
            Reference Price{" "}
            <div className="bg-red-dull rounded-full h-max px-2 py-0.5 text-sm ml-2 text-white flex gap-1.5 items-center">
              <span className="p-1 rounded-full bg-white"></span>Stopped
            </div>
          </h2>
          <div className="mt-5 rounded-lg bg-black-200 p-4">
            <div className="flex lg:items-center lg:flex-row flex-col lg:justify-between items-start w-full gap-8">
              <div className="w-full space-y-4">
                <p className="text-base text-white/80">
                  Select Reference Price Source (Supports DEXs):
                </p>
                <div className="!w-[200px]">
                  <SelectComponent
                    className="!py-3 h-max border-0 rounded-md bg-black-dark text-white"
                    placeholder={"Select"}
                    ListBoxOptions="bg-[#202231] !-mt-1 !rounded-none !rounded-b-md border-0 !py-0"
                    selected={select}
                    setSelected={setSelect}
                    Data={selectData}
                  />
                </div>
                <h6 className="font-medium text-white/80 text-base flex items-center">
                  System will send notification when market price between two
                  exchanges is greater than{" "}
                  <span className="cursor-not-allowed px-5 py-1 mx-1 rounded-md bg-black-dark  text-white/80">
                    5
                  </span>{" "}
                  %
                </h6>
                <p className="text-sm font-medium text-red-dull !mt-1">
                  Note: anti-arbitrage code will be activated once the bot is
                  live.
                </p>
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
        </div>

        <div className="p-5 bg-black-400 w-full max-w-[1200px] flex flex-col rounded-lg">
          <h2 className="flex text-lg text-primary/70 font-semibold items-center">
            Price Support{" "}
            <div className="bg-green-200 rounded-full h-max px-2 py-0.5 text-sm ml-2 text-white flex gap-1.5 items-center">
              <span className="p-1 rounded-full bg-white"></span>Live
            </div>
          </h2>
          <div className="mt-5 rounded-lg bg-black-200 p-4">
            <div className="flex lg:items-center lg:flex-row flex-col lg:justify-between items-start w-full gap-8">
              <div className="w-full space-y-4">
                <h6 className="font-medium text-white/80 text-base flex items-center">
                  Set Price:{" "}
                  <span className="cursor-not-allowed px-5 py-1 mx-1 rounded-md bg-black-dark  text-white/80">
                    0.015
                  </span>{" "}
                  RFC/USDT
                </h6>
                <p className="text-sm font-medium text-red-dull !mt-1">
                  Note: System will send notification when market price falls
                  below the set price.
                </p>
                <p className="text-sm font-medium text-red-dull !mt-0">
                  The bot from Liquidity Support will buy up orders below the
                  set price for price support.
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

        <div className="p-5 bg-black-400 w-full max-w-[1200px] flex flex-col rounded-lg">
          <h2 className="flex text-lg text-primary/70 font-semibold items-center">
            Cash-out{" "}
            <div className="bg-green-200 rounded-full h-max px-2 py-0.5 text-sm ml-2 text-white flex gap-1.5 items-center">
              <span className="p-1 rounded-full bg-white"></span>Live
            </div>
          </h2>
          <div className="mt-5 rounded-lg bg-black-200 p-4">
            <div className="flex lg:items-center lg:flex-row flex-col lg:justify-between items-start w-full gap-8">
              <div className="w-full space-y-4">
                <h6 className="font-medium text-white/80 text-base flex items-center">
                  Greater than this set price, bots will start to sell:{" "}
                  <span className="cursor-not-allowed px-5 py-1 mx-1 rounded-md bg-black-dark  text-white/80">
                    0.023
                  </span>{" "}
                  RFC/USDT
                </h6>
                <div className="flex gap-8 w-full max-w-[400px]">
                  <CheckBox
                    label={
                      <div className="flex items-center gap-3 relative">
                        <p className="text-base">Big sell orders</p>
                        <Tooltip
                          text={
                            "Big order are set in 3 positions, ~1000U/position, placed on the sell order above the set price."
                          }
                          classNames="w-[220px] bottom-[calc(100%+10px)] !p-3"
                          position="top"
                        >
                          <IoIosInformationCircle className="text-lg cursor-pointer" />
                        </Tooltip>
                      </div>
                    }
                    className="!bg-black-dark border-none"
                    disabled
                    labelClass="text-white/80"
                  />
                  <CheckBox
                    label={
                      <div className="flex items-center gap-3 relative">
                        <p className="text-base">Small sell orders</p>
                        <Tooltip
                          text={
                            "Small order are set in to ~100U, placed on the sell order above the set price."
                          }
                          classNames="w-[220px] bottom-[calc(100%+10px)] !p-3"
                          position="top"
                        >
                          <IoIosInformationCircle className="text-lg cursor-pointer" />
                        </Tooltip>
                      </div>
                    }
                    className="border-none"
                    disabled
                    checked
                    labelClass="text-white/80"
                  />
                </div>
                <h6 className="font-medium text-white/80 text-base flex items-center">
                  System will send notification when sold over{" "}
                  <span className="cursor-not-allowed px-5 py-1 mx-1 rounded-md bg-black-dark  text-white/80">
                    500
                  </span>{" "}
                  USD
                </h6>
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

export default VipServices;
