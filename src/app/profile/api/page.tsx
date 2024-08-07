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
      <div className=" bg-[#16234B] min-h-[100vh] md:py-20 py-10">
        <Container className="flex justify-center">
          <div className="sm:p-10 px-4 py-10  bg-[#1E3372] w-full max-w-[800px] flex flex-col items-center rounded-lg">
            <h1 className="text-4xl font-slussen textGradient font-semibold mb-12">
              Bind API
            </h1>
            <section className="space-y-5 w-full">
              <div className="grid md:grid-cols-4 w-full gap-3 items-center">
                <p className="text-white font-slussen text-base">Exchange:</p>
                <div className="col-span-3">
                  <SelectComponent
                    className="bg-[#31488E] text-white  font-slussen w-full !rounded-md"
                    placeholder={"Please choose"}
                    selected={selectExchange}
                    setSelected={setSelectExchange}
                    Data={dataExchange}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-3 w-full items-center">
                <p className="text-white font-slussen text-base">API KEY:</p>
                <div className="col-span-3">
                  <Input
                    className="bg-[#31488E] font-slussen text-white w-full"
                    placeholder={""}
                    name=""
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-3 w-full items-center">
                <p className="text-white font-slussen text-base">SECRET KEY:</p>
                <div className="col-span-3">
                  <Input
                    className="bg-[#31488E] font-slussen text-white w-full"
                    placeholder={""}
                    name=""
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-3 w-full items-center">
                <p className="text-white font-slussen text-base">
                  Purpose of this account:
                </p>
                <div className="col-span-3">
                  <SelectComponent
                    className="bg-[#31488E] text-white font-slussen w-full !rounded-md"
                    placeholder={"Please choose"}
                    selected={select}
                    setSelected={setSelect}
                    Data={data}
                  />
                </div>
              </div>
              <div className="pt-8 flex justify-center">
                <Button className="w-1/2 rounded-md font-slussen bg-primary">
                  Submit
                </Button>
              </div>
            </section>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default API;
