import React, { Fragment } from "react";
import { Container } from "@/components/common";
import { TfiReload } from "react-icons/tfi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Button } from "@headlessui/react";

const data = [
  {
    title: "Volume Support",
    rfcAmout: "133,334",
    usdtAmount: "1,961",
    bmxAmount: "0",
  },
  {
    title: "Liquidity Support",
    rfcAmout: "293,587",
    usdtAmount: "5,815.33",
    bmxAmount: "0.001508",
  },
  {
    title: "Cash-out",
    rfcAmout: "87,577",
    usdtAmount: "2,341.34",
    bmxAmount: "0",
  },
  {
    title: "Manual Operation",
    rfcAmout: "324,253",
    usdtAmount: "8,706.49",
    bmxAmount: "0",
  },
];

const data2 = [
  {
    title: "Basic Services, expires on:",
    date: "2024/08/03 , 12 days remaining",
    amount: "500",
  },
  {
    title: "Reference Price, expires on:",
    date: "2024/07/03 , Expired",
    amount: "100",
  },
  {
    title: "Cash-out, expires on:",
    date: "2024/08/03 , 12 days remaining",
    amount: "100",
  },
  {
    title: "Price Support, expires on:",
    date: "2024/08/03 , 12 days remaining",
    amount: "100",
  },
];

const AccountOverview: React.FC = () => {
  return (
    <Fragment>
      <div className="md:py-20 min-h-[100vh] py-10 bg-black-dull border-b flex justify-center w-full">
        <Container className="flex flex-col itemc-center space-y-5 w-full">
          <div className="p-10 bg-black-400 w-full max-w-[1200px] flex flex-col rounded-lg">
            <h1 className="text-4xl textGradient font-semibold">
              Account Overview
            </h1>
            <p className="text-white/50 text-base pt-3">
              Account Name: <span className="text-white">royalfinancecoin</span>
            </p>
            <h3 className="text-white/50 font-semibold text-2xl pt-4">
              List of Active Exchnage
            </h3>
            <section className="w-full space-y-5">
              <div className="mt-8">
                <div className="bg-black flex items-center justify-between p-5 rounded-t-xl">
                  <div className="flex items-center gap-5">
                    <h6 className="text-white font-medium text-lg">BITMART</h6>
                    <h6 className="text-white/50 font-medium text-lg">
                      RFC/USDT
                    </h6>
                  </div>
                  <div className="flex items-center gap-4 text-white">
                    <TfiReload className="text-xl cursor-pointer" />
                    <MdOutlineKeyboardArrowDown className="text-3xl cursor-pointer" />
                  </div>
                </div>
                <div className="bg-black-200 rounded-b-xl p-5">
                  {data.length > 0 &&
                    data.map((item, index) => {
                      const isLastItem = index === data.length - 1;
                      const isFirstChild = index === 0;
                      return (
                        <div
                          className={`${isLastItem && "border-b-0 pb-0"} ${
                            isFirstChild && "pt-0"
                          } border-b flex lg:flex-row flex-col justify-between gap-5 py-3 items-center border-b-black-400`}
                          key={index}
                        >
                          <div className="flex gap-5 w-full items-center justify-between lg:max-w-[700px] w-max-w">
                            <p className="text-white/50 text-base w-full max-w-[180px]">
                              {item.title}
                            </p>
                            <div className="flex lg:flex-row lg:w-full w-auto flex-col justify-self-end lg:justify-self-auto">
                              <p className="text-white/50 text-base w-full max-w-[180px]">
                                {item.rfcAmout}{" "}
                                <span className="text-white">RFC</span>
                              </p>
                              <p className="text-white/50 text-base w-full max-w-[180px]">
                                {item.usdtAmount}{" "}
                                <span className="text-white">USDT</span>
                              </p>
                              <p className="text-white/50 text-base w-full max-w-[180px]">
                                {item.bmxAmount}{" "}
                                <span className="text-white">BMX</span>
                              </p>
                            </div>
                          </div>
                          <Button className="bg-[#4E393E] text-[#D4413E] hover:bg-[#D4413E] hover:text-white rounded-md py-2 px-8 w-full lg:w-max">
                            Unbind
                          </Button>
                        </div>
                      );
                    })}
                </div>
              </div>
            </section>
          </div>
          <div className="p-10 bg-black-400 w-full max-w-[1200px] flex flex-col rounded-lg">
            <h1 className="text-4xl textGradient font-semibold">
              Expiration Date and Cost
            </h1>
            <p className="text-white font-medium text-base pt-3">BITMART</p>
            <section className="w-full space-y-5">
              <div className="mt-8">
                <div className="flex items-center gap-5 p-5 rounded-t-xl bg-black">
                  <h6 className="text-white font-medium text-lg">RFC/USDT</h6>
                  <h6 className="text-white/50 font-medium text-lg">
                    Expiration Dates:
                  </h6>
                </div>
                <div className="bg-black-200 rounded-b-xl p-5">
                  {data2.length > 0 &&
                    data2.map((item, index) => {
                      const isLastItem = index === data.length - 1;
                      const isFirstChild = index === 0;
                      return (
                        <div
                          className={`${isLastItem && "border-b-0 pb-0"} ${
                            isFirstChild && "pt-0"
                          } border-b flex justify-between flex-wrap md:flex-nowrap py-4 items-center border-b-black-400`}
                          key={index}
                        >
                          <div className="flex w-full flex-wrap">
                            <p className="text-white/50 text-base w-full max-w-[250px]">
                              {item.title}
                            </p>
                            <p className="text-white/50 text-base w-full max-w-[250px]">
                              {item.date}
                            </p>
                          </div>
                          <p className="text-white text-base flex gap-1 max-w-max w-full self-end">
                            {item.amount}{" "}
                            <span className="text-white/50">USDT/Month</span>
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </section>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default AccountOverview;
