import React from "react";
import { Button, Container } from "@/components/common/index";
import { RiFileList2Line } from "react-icons/ri";
import Input from "@/components/common/Forms/Input";

const data = [
  {
    id: 1,
    icon: <RiFileList2Line />,
    title: "Volume Support",
    description:
      "You can specify daily minimum and maximum trading volume, and the bot will trade randomly within this range with no loss besides exchange trading fees.",
  },
  {
    id: 2,
    icon: <RiFileList2Line />,
    title: "Liquidity Support",
    description:
      "You can control the buy/sell orders on the orderbook. Anti-arbitrage protection logic is built into this bot to ensure your MM fund' safety.",
  },
  {
    id: 3,
    icon: <RiFileList2Line />,
    title: "Instant Notification",
    description:
      "Our system will notify you when your assets change based on your settings.",
  },
];
const ApplyMyTrade = () => {
  return (
    <div className="relative bg-black-dull" id="about">
      <Container className="md:py-28 py-10">
        <div className="text-center bg-black-mid rounded-lg py-16 flex flex-col items-center">
          <h1 className="text-4xl textGradient font-semibold uppercase">
            Apply for Scorpian-labs MM Tool
          </h1>
          <p className="pt-3 text-base">
            Please fill in the info below, our sales manager will contact you!
          </p>
          <div className="mt-16 flex flex-col space-y-3 w-ful max-w-[600px]">
            <div className="rounded-md w-full py-2 px-8 bg-black-400 grid grid-cols-4 items-center gap-5">
              <p className="text-white text-base whitespace-nowrap col-span-1 text-left">
                Project Name:
              </p>
              <div className="col-span-3">
                <Input
                  placeholder="please enter"
                  size="sm"
                  className="!bg-transparent border-none text-white !w-full"
                  name={""}
                />
              </div>
            </div>
            <div className="rounded-md w-full py-2 px-8 bg-black-400 grid grid-cols-4 items-center gap-5">
              <p className="text-white text-base whitespace-nowrap col-span-1 text-left">
                Website:
              </p>
              <div className="col-span-3">
                <Input
                  placeholder="please enter"
                  size="sm"
                  className="!bg-transparent border-none text-white w-full"
                  name={""}
                />
              </div>
            </div>
            <div className="rounded-md w-full py-2 px-8 bg-black-400 grid grid-cols-4 items-center gap-5">
              <p className="text-white text-base whitespace-nowrap col-span-1 text-left">
                Company Email:
              </p>
              <div className="col-span-3">
                <Input
                  placeholder="please enter"
                  size="sm"
                  className="!bg-transparent border-none text-white w-full"
                  name={""}
                />
              </div>
            </div>
            <div className="rounded-md w-full py-2 px-8 bg-black-400 grid grid-cols-4 items-center gap-5">
              <p className="text-white text-base whitespace-nowrap col-span-1 text-left">
                Telegram:
              </p>
              <div className="col-span-3">
                <Input
                  placeholder="please enter"
                  size="sm"
                  className="!bg-transparent border-none text-white w-full"
                  name={""}
                />
              </div>
            </div>
            <div className="pt-8 w-full">
              <Button className="text-white bg-primary rounded-md w-full">
                Get Started Today
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ApplyMyTrade;
