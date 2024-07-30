import { Container } from "@/components/common";
import React from "react";

const data = [{ src: "", alt: "" }];

const PartnerExchange = () => {
  return (
    <div className="bg-white py-[65px]">
      <Container size="xl">
        <h2 className="text-center text-[#0A2540] font-bold text-5xl leading-[48px] tracking-[0.96px] font-slussen">
          PARTNER EXCHANGE
        </h2>
        <div className="mt-20 grid grid-cols-7 gap-4"></div>
      </Container>
    </div>
  );
};

export default PartnerExchange;
