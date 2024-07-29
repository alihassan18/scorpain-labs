import React from "react";
import { Container, Button } from "@/components/common";
import { BsArrowUpRight } from "react-icons/bs";

const OurMission: React.FC = () => {
  return (
    <div className="bg-main py-[65px]">
      <Container
        size="xl"
        className="bg-mission bg-cover py-[208px] flex flex-col items-center"
      >
        <h2 className="text-white uppercase font-medium text-8xl leading-[99.84px] tracking-[-2.88px] text-center max-w-[875px] font-slussen">
          Your liquidity our Commitment
        </h2>
        <p className="text-center text-white text-lg tracking-[0.34px] leading-[28.8px] font-normal font-slussen pt-[65px] max-w-[927px]">
          Scorpion Labs has successfully supported over 100 projects, fostering
          thriving markets. Our team leverages proprietary trading software to
          gather market data and implement customized trading strategies.
        </p>
        <Button className="font-slussen mt-[65px] bg-secondary whitespace-nowrap !text-2xl tracking-[0.34px] !text-black-100 flex items-center !py-2 !px-6 rounded-none gap-8 ">
          Get Started <BsArrowUpRight className="text-sm" />
        </Button>
      </Container>
    </div>
  );
};

export default OurMission;
