import React from "react";
import { Container, Button } from "@/components/common";
import { BsArrowUpRight } from "react-icons/bs";

const OurMission: React.FC = () => {
  return (
    <section className="bg-main py-[65px]">
      <div className="bg-mission bg-cover w-full">
        <Container
          size="xl"
          className="bg-mission-mobile md:py-[146.66px] sm:py-[80px] py-[50px] flex flex-col items-center"
        >
          <h2 className="text-white uppercase font-medium sm:text-8xl text-[28px] sm:leading-[99.84px] leading-[36.68px] tracking-[-2.88px] text-center max-w-[875px] font-slussen">
            Your liquidity our Commitment
          </h2>
          <p className="text-center text-white text-lg tracking-[0.34px] leading-[28.8px] font-normal font-slussen sm:pt-[65px] pt-8 max-w-[927px]">
            Scorpion Labs has successfully supported over 100 projects,
            fostering thriving markets. Our team leverages proprietary trading
            software to gather market data and implement customized trading
            strategies.
          </p>
          <Button className="font-slussen mt-[65px] bg-secondary whitespace-nowrap !text-2xl tracking-[0.34px] !text-black-100 flex items-center !py-2 !px-6 rounded-none gap-8 ">
            Get Started <BsArrowUpRight className="text-sm" />
          </Button>
        </Container>
      </div>
    </section>
  );
};

export default OurMission;
