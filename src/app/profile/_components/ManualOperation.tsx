"use client";
import React, { Fragment, useState } from "react";
import Input from "@/components/common/Forms/Input";
import { Button } from "@/components/common";
import OpenOrders from "./_components/OpenOrders";

const ManualOperation: React.FC = () => {
  const [value, setValue] = useState("");

  const handleKeyPress = (event: {
    charCode: any;
    preventDefault: () => void;
  }) => {
    const charCode = event.charCode;
    if (
      (charCode >= 48 && charCode <= 57) || // 0-9
      charCode === 46 // .
    ) {
      // Allow these characters
    } else {
      event.preventDefault();
    }
  };

  const handleChange = (event: { target: { value: any } }) => {
    const newValue = event.target.value;
    if (/^\d*\.?\d*$/.test(newValue)) {
      setValue(newValue);
    }
  };
  return (
    <Fragment>
      <div className="p-5  bg-[#1E3372]  w-full max-w-[1200px] flex flex-col">
        <h2 className="flex text-lg text-yellow-700 font-semibold items-center font-slussen">
          Manual Operation
        </h2>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div className="mt-5  bg-[#31488E] p-4">
            <p className="text-white text-base font-slussen">
              Available: 4,707.505 USDT
            </p>
            <section className="space-y-2 mt-5">
              <div className="grid grid-cols-3 items-center bg-blue-dark px-3">
                <p className="text-white/80 text-base font-slussen">Price</p>
                <Input
                  className="border-transparent rounded-none font-slussen focus:border focus:border-yellow-700 text-center text-white"
                  size="md"
                  placeholder="0.0"
                  name="price"
                  value={value}
                  onKeyPress={handleKeyPress}
                  onChange={handleChange}
                />
                <p className="text-white/80 text-base text-righ font-slussent">
                  USDT
                </p>
              </div>
              <div className="grid grid-cols-3 items-center bg-blue-dark px-3">
                <p className="text-white/80 text-base font-slussen">Amount</p>
                <Input
                  className="border-transparent rounded-none font-slussen focus:border focus:border-yellow-700 text-center text-white"
                  size="md"
                  placeholder="0.0"
                  name="price"
                  value={value}
                  onKeyPress={handleKeyPress}
                  onChange={handleChange}
                />
                <p className="text-white/80 text-base text-right font-slussen">
                  RFC
                </p>
              </div>
              <div className="grid grid-cols-3 items-center bg-blue-dark px-3">
                <p className="text-white/80 text-base font-slussen">Total</p>
                <Input
                  className="border-transparent rounded-none font-slussen focus:border focus:border-yellow-700 text-center text-white"
                  size="md"
                  placeholder="0.0"
                  name="price"
                  value={value}
                  onKeyPress={handleKeyPress}
                  onChange={handleChange}
                />
                <p className="text-white/80 text-base text-right font-slussen">
                  USDT
                </p>
              </div>
              <Button
                className="w-full bg-green-400 text-white font-slussen font-semibold py-3 disabled:opacity-50 rounded-none"
                disabled
              >
                Buy
              </Button>
            </section>
          </div>
          <div className="mt-5  bg-[#31488E] p-4">
            <p className="text-white text-base font-slussen">
              Available: 283,420 RFC
            </p>
            <section className="space-y-2 mt-5">
              <div className="grid grid-cols-3 items-center bg-blue-dark px-3">
                <p className="text-white/80 text-base font-slussen">Price</p>
                <Input
                  className="border-transparent font-slussen rounded-none focus:border focus:border-yellow-700 text-center text-white"
                  size="md"
                  placeholder="0.0"
                  name="price"
                  value={value}
                  onKeyPress={handleKeyPress}
                  onChange={handleChange}
                />
                <p className="text-white/80 text-base text-right font-slussen">
                  USDT
                </p>
              </div>
              <div className="grid grid-cols-3 items-center bg-blue-dark px-3">
                <p className="text-white/80 text-base font-slussen">Amount</p>
                <Input
                  className="border-transparent rounded-none font-slussen focus:border focus:border-yellow-700 text-center text-white"
                  size="md"
                  placeholder="0.0"
                  name="price"
                  value={value}
                  onKeyPress={handleKeyPress}
                  onChange={handleChange}
                />
                <p className="text-white/80 text-base text-right font-slussen">
                  RFC
                </p>
              </div>
              <div className="grid grid-cols-3 items-center bg-blue-dark px-3">
                <p className="text-white/80 text-base font-slussen">Total</p>
                <Input
                  className="border-transparent rounded-none font-slussen focus:border focus:border-yellow-700 text-center text-white"
                  size="md"
                  placeholder="0.0"
                  name="price"
                  value={value}
                  onKeyPress={handleKeyPress}
                  onChange={handleChange}
                />
                <p className="text-white/80 text-base text-right font-slussen">
                  USDT
                </p>
              </div>
              <Button
                className="w-full bg-red-dull rounded-none font-slussen text-white font-semibold py-3 disabled:opacity-50"
                disabled
              >
                Sell
              </Button>
            </section>
          </div>
        </div>
        <h2 className="flex text-lg text-yellow-700 font-semibold items-center mt-5 font-slussen">
          Open Orders
        </h2>
        <div className="mt-5 bg-main">
          <OpenOrders />
        </div>
      </div>
    </Fragment>
  );
};

export default ManualOperation;
