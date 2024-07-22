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
      <div className="p-5 bg-black-400 w-full max-w-[1200px] flex flex-col rounded-lg">
        <h2 className="flex text-lg text-white/70 font-semibold items-center">
          Manual Operation
        </h2>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div className="mt-5 rounded-lg bg-black-200 p-4">
            <p className="text-white text-base">Available: 4,707.505 USDT</p>
            <section className="space-y-2 mt-5">
              <div className="grid grid-cols-3 items-center bg-black-dark rounded-md px-3">
                <p className="text-white/80 text-base">Price</p>
                <Input
                  className="border-transparent focus:border focus:border-primary text-center text-white"
                  size="md"
                  placeholder="0.0"
                  name="price"
                  value={value}
                  onKeyPress={handleKeyPress}
                  onChange={handleChange}
                />
                <p className="text-white/80 text-base text-right">USDT</p>
              </div>
              <div className="grid grid-cols-3 items-center bg-black-dark rounded-md px-3">
                <p className="text-white/80 text-base">Amount</p>
                <Input
                  className="border-transparent focus:border focus:border-primary text-center text-white"
                  size="md"
                  placeholder="0.0"
                  name="price"
                  value={value}
                  onKeyPress={handleKeyPress}
                  onChange={handleChange}
                />
                <p className="text-white/80 text-base text-right">RFC</p>
              </div>
              <div className="grid grid-cols-3 items-center bg-black-dark rounded-md px-3">
                <p className="text-white/80 text-base">Total</p>
                <Input
                  className="border-transparent focus:border focus:border-primary text-center text-white"
                  size="md"
                  placeholder="0.0"
                  name="price"
                  value={value}
                  onKeyPress={handleKeyPress}
                  onChange={handleChange}
                />
                <p className="text-white/80 text-base text-right">USDT</p>
              </div>
              <Button
                className="w-full bg-green-400 rounded-md text-white font-semibold py-3 disabled:opacity-50"
                disabled
              >
                Buy
              </Button>
            </section>
          </div>
          <div className="mt-5 rounded-lg bg-black-200 p-4">
            <p className="text-white text-base">Available: 283,420 RFC</p>
            <section className="space-y-2 mt-5">
              <div className="grid grid-cols-3 items-center bg-black-dark rounded-md px-3">
                <p className="text-white/80 text-base">Price</p>
                <Input
                  className="border-transparent focus:border focus:border-primary text-center text-white"
                  size="md"
                  placeholder="0.0"
                  name="price"
                  value={value}
                  onKeyPress={handleKeyPress}
                  onChange={handleChange}
                />
                <p className="text-white/80 text-base text-right">USDT</p>
              </div>
              <div className="grid grid-cols-3 items-center bg-black-dark rounded-md px-3">
                <p className="text-white/80 text-base">Amount</p>
                <Input
                  className="border-transparent focus:border focus:border-primary text-center text-white"
                  size="md"
                  placeholder="0.0"
                  name="price"
                  value={value}
                  onKeyPress={handleKeyPress}
                  onChange={handleChange}
                />
                <p className="text-white/80 text-base text-right">RFC</p>
              </div>
              <div className="grid grid-cols-3 items-center bg-black-dark rounded-md px-3">
                <p className="text-white/80 text-base">Total</p>
                <Input
                  className="border-transparent focus:border focus:border-primary text-center text-white"
                  size="md"
                  placeholder="0.0"
                  name="price"
                  value={value}
                  onKeyPress={handleKeyPress}
                  onChange={handleChange}
                />
                <p className="text-white/80 text-base text-right">USDT</p>
              </div>
              <Button
                className="w-full bg-red-dull rounded-md text-white font-semibold py-3 disabled:opacity-50"
                disabled
              >
                Sell
              </Button>
            </section>
          </div>
        </div>
        <h2 className="flex text-lg text-white/70 font-semibold items-center mt-5">
          Open Orders
        </h2>
        <div className="mt-5 bg-black-200 rounded-lg">
          <OpenOrders />
        </div>
      </div>
    </Fragment>
  );
};

export default ManualOperation;
