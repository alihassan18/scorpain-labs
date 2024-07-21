"use client";
import { Button, Container } from "@/components/common";
import Input from "@/components/common/Forms/Input";
import SelectComponent from "@/components/common/Forms/SelectComponents";
import React, { Fragment, useState } from "react";

const dataExchange = [{ name: "BITMART" }];
const data = [
  { name: "Volume Support" },
  { name: "Liquidity Support" },
  { name: "Cash-out(VIP Services)" },
  { name: "Manual Operation" },
];

const API: React.FC = () => {
  const [selectExchange, setSelectExchange] = useState("");
  const [select, setSelect] = useState("");
  return (
    <Fragment>
      <div className="bg-black-dull min-h-[100vh] md:py-20 py-10">
        <Container className="flex justify-center">
          <div className="p-10 bg-black-400 w-full max-w-[800px] flex flex-col items-center rounded-lg">
            <h1 className="text-4xl textGradient font-semibold mb-12">
              Bind API
            </h1>
            <section className="space-y-5 w-full">
              <div className="grid grid-cols-4 w-full items-center">
                <p className="text-white text-base">Exchange:</p>
                <div className="col-span-3">
                  <SelectComponent
                    className="bg-black-mid text-white w-full !rounded-md"
                    placeholder={"Please choose"}
                    selected={selectExchange}
                    setSelected={setSelectExchange}
                    Data={dataExchange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 w-full items-center">
                <p className="text-white text-base">API KEY:</p>
                <div className="col-span-3">
                  <Input
                    className="bg-black-mid text-white w-full"
                    placeholder={""}
                    name=""
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 w-full items-center">
                <p className="text-white text-base">SECRET KEY:</p>
                <div className="col-span-3">
                  <Input
                    className="bg-black-mid text-white w-full"
                    placeholder={""}
                    name=""
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 w-full items-center">
                <p className="text-white text-base">Purpose of this account:</p>
                <div className="col-span-3">
                  <SelectComponent
                    className="bg-black-mid text-white w-full !rounded-md"
                    placeholder={"Please choose"}
                    selected={select}
                    setSelected={setSelect}
                    Data={data}
                  />
                </div>
              </div>
              <div className="pt-8 flex justify-center">
                <Button className="w-1/2 rounded-md bg-primary">Submit</Button>
              </div>
            </section>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default API;
