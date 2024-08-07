"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Container } from "@/components/common";
import { IUser } from "@/interfaces/user.interface";
import { getObjectFromLocalStorage } from "@/utils/storage";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FaChevronCircleDown } from "react-icons/fa";

const activeExchangeData: any = [
  {
    name: "Volume Support",
    rfc: "133334",
    usdt: "1962.71",
    bmx: "0",
  },
  {
    name: "Liquidity Support",
    rfc: "293,587",
    usdt: "5815.33",
    bmx: "0.001508",
  },
  {
    name: "Cash-out",
    rfc: "87577",
    usdt: "2341.34",
    bmx: "0",
  },
  {
    name: "Control Operation",
    rfc: "324253",
    usdt: "8706.49",
    bmx: "0",
  },
  {
    name: "Uniswap Support",
    rfc: "200000",
    usdt: "6700.49",
    bmx: "0",
  },
];

const bitmartExpDateCost: any = [
  {
    name: "Basic Services, expires on:",
    remain: "2024/08/03 , 12 days remaining",
    usdt: "2500",
    term: "montly",
  },
  {
    name: "Reference Price, expires on:",
    remain: "2024/07/03 , Expired",
    usdt: "1000",
    term: "montly",
  },
  {
    name: "Cash-out, expires on:",
    remain: "2024/08/03 , 12 days remaining",
    usdt: "1000",
    term: "montly",
  },
  {
    name: "Price Support, expires on:",
    remain: "2024/08/03 , 12 days remaining",
    usdt: "1000",
    term: "montly",
  },
];

const AccountOverview: React.FC = () => {
  const userLocal: IUser | null = getObjectFromLocalStorage("user");
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    userLocal && setUser(userLocal);
  }, [userLocal]);

  return (
    <Fragment>
      <div className="md:py-20 min-h-[100vh] py-10 bg-[#16234B] border-b">
        <Container className="flex justify-center flex-col gap-10">
          <div className="p-10 bg-[#1E3372] w-full flex flex-col rounded-lg">
            <h1 className="text-3xl textGradient font-slussen font-semibold mb-3">
              Account Overview
            </h1>
            <h3 className="text-xl font-slussen text-white mb-10">
              Account Name: rfc
            </h3>
            <h2 className="md:text-2xl text-xl font-slussen text-white font-semibold mb-3">
              List of Active Exchanges
            </h2>
            <section className="w-full  space-y-5">
              <Disclosure
                as="div"
                className="bg-[#31488E]  w-full overflow-auto"
                style={{ borderRadius: 10 }}
                defaultOpen={true}
              >
                <DisclosureButton
                  className="group flex w-full items-center font-slussen justify-between p-5"
                  style={{
                    backgroundColor: "#31488E",
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                  }}
                >
                  <span className="text-sm/6 font-medium text-white font-slussen group-data-[hover]:text-white/80 flex gap-10 items-center">
                    <span className="md:text-xl px-6 text-sm font-slussen me-10">
                      BITMART
                    </span>
                    <span className="text-sm font-slussen">RFC/USDT</span>
                  </span>
                  <FaChevronCircleDown className="text-xl font-slussen text-white group-data-[open]:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel
                  className="p-5 font-slussen text-sm/5 text-white/50"
                  style={{
                    backgroundColor: "#31488E",
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}
                >
                  <table className="w-full master-table  md:text-lg text-sm">
                    {activeExchangeData &&
                      activeExchangeData.map((item: any) => (
                        <tr className="text-normal !ml-10">
                          <td>
                            {" "}
                            <div className="px-6 whitespace-nowrap">
                              {item.name}
                            </div>
                          </td>
                          <td>
                            {" "}
                            <div className="px-6 whitespace-nowrap">
                              {item.rfc}{" "}
                              <span className="text-white font-slussen">
                                RFC
                              </span>
                            </div>
                          </td>
                          <td>
                            {" "}
                            <div className="px-6 whitespace-nowrap">
                              {item.usdt}{" "}
                              <span className="text-white font-slussen">
                                USDT
                              </span>
                            </div>
                          </td>
                          <td>
                            {" "}
                            <div className="px-6 whitespace-nowrap">
                              {item.mbx}{" "}
                              <span className="text-white font-slussen">
                                BMX
                              </span>
                            </div>
                          </td>
                          <td width={100}>
                            {" "}
                            <div className="px-6 whitespace-nowrap">
                              <Button
                                variant={"outline"}
                                color={"danger"}
                                style={{
                                  color: "white",
                                  borderColor: "transparent",
                                  backgroundColor: "#E93E3E",
                                  borderRadius: 10,
                                  padding: "7px 15px",
                                }}
                                className=" font-slussen"
                              >
                                Unbind
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </table>
                </DisclosurePanel>
              </Disclosure>
            </section>
          </div>
          <div className="p-10 bg-[#1E3372] w-full flex flex-col rounded-lg">
            <h1 className="text-3xl font-slussen textGradient font-semibold mb-3">
              Expiration Date and Cost
            </h1>
            <h2 className="text-xl font-slussen text-white font-semibold mb-3">
              BITMART
            </h2>
            <section className="w-full  space-y-5">
              <Disclosure
                as="div"
                className="  overflow-auto  bg-[#31488E]"
                style={{ borderRadius: 10 }}
                defaultOpen={true}
              >
                <DisclosureButton
                  className="group flex w-full items-center justify-between p-5"
                  style={{
                    backgroundColor: "#31488E",
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                  }}
                >
                  <span className="text-sm/6 font-slussen font-medium text-white group-data-[hover]:text-white/80 flex gap-10 items-center">
                    <span className="md:text-xl text-sm font-slussen me-3 px-6">
                      RFC/USDT
                    </span>
                    <span className="md:text-xl text-sm flex font-slussen px-6 whitespace-nowrap">
                      Expiration Dates:
                    </span>
                  </span>
                  <FaChevronCircleDown className="text-xl font-slussen text-white group-data-[open]:rotate-180" />{" "}
                </DisclosureButton>
                <DisclosurePanel
                  className="p-5 text-sm/5 text-white/50  w-full font-slussen"
                  style={{
                    backgroundColor: "",
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}
                >
                  <table className="w-full master-table md:text-lg text-sm">
                    {bitmartExpDateCost &&
                      bitmartExpDateCost.map((item: any) => (
                        <tr className="text-normal font-slussen">
                          <td style={{ width: "calc(50% - 200px)" }}>
                            <div className="px-6 whitespace-nowrap">
                              {item.name}
                            </div>
                          </td>
                          <td style={{ width: "50%" }}>
                            <div className="px-6 whitespace-nowrap">
                              {item.remain}
                            </div>
                          </td>
                          <td width={200} style={{ textAlign: "right" }}>
                            {" "}
                            <div className="px-6 whitespace-nowrap">
                              <span className="text-white">{item.usdt}</span>{" "}
                              USDT/
                              <span
                                style={{
                                  textTransform: "capitalize",
                                }}
                              >
                                {item.term}
                              </span>{" "}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </table>
                </DisclosurePanel>
              </Disclosure>
            </section>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default AccountOverview;
