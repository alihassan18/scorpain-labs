import { Button, Container } from "@/components/common";
import React from "react";
import { BsArrowUpRight } from "react-icons/bs";

const Apply = () => {
  return (
    <>
      <div className="sm:py-[60px] py-[30px]">
        <Container size="xl" className="flex justify-center">
          <div className="w-full max-w-[633.12px]">
            <h2 className="sm:text-[28px] text-2xl font-bold font-slussen text-center">
              Apply for Scorpian-labs MM Tool
            </h2>
            <p className="text-[20px] font-normal leading-tight font-slussen !text-[#56718D] text-center mt-5">
              Please fill in the info below, our sales manager will contact you!
            </p>

            <div className="mt-[50px] space-y-3">
              <div className=" relative">
                <label
                  htmlFor=""
                  className="absolute text-lg font-normal font-slussen top-[30%] left-[3%]"
                >
                  Project Name:
                </label>
                <input
                  type="text"
                  placeholder="PLease Enter"
                  className="w-full pl-44 py-6 placeholder:text-base  border border-[#56718D80]/50 placeholder:font-slussen placeholder:font-normal"
                />
              </div>
              <div className=" relative">
                <label
                  htmlFor=""
                  className="absolute text-lg font-normal font-slussen top-[30%] left-[3%]"
                >
                  Website:
                </label>
                <input
                  type="text"
                  placeholder="PLease Enter"
                  className="w-full pl-44 py-6 placeholder:text-base border border-[#56718D80]/50  placeholder:font-slussen placeholder:font-normal"
                />
              </div>
              <div className=" relative">
                <label
                  htmlFor=""
                  className="absolute text-lg font-normal font-slussen top-[30%] left-[3%]"
                >
                  Company Name:
                </label>
                <input
                  type="text"
                  placeholder="PLease Enter"
                  className="w-full pl-44 py-6 placeholder:text-base border border-[#56718D80]/50  placeholder:font-slussen placeholder:font-normal"
                />
              </div>
              <div className=" relative">
                <label
                  htmlFor=""
                  className="absolute text-lg font-normal font-slussen top-[30%] left-[3%]"
                >
                  Telegram:
                </label>
                <input
                  type="text"
                  placeholder="PLease Enter"
                  className="w-full pl-44 py-6 placeholder:text-base border border-[#56718D80]/50 placeholder:font-slussen placeholder:font-normal"
                />
              </div>
            </div>
            <Button className="bg-secondary !w-full mt-12 font-slussen font-normal whitespace-nowrap !text-2xl tracking-[0.34px] !text-black-100 flex items-center !py-2 !px-6 rounded-none gap-8 ">
              Get Started Today <BsArrowUpRight className="text-sm" />
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Apply;
