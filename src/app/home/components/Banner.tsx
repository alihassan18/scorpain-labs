import { Container } from "@/components/common";
import React, { Fragment } from "react";

const Banner: React.FC = () => {
  return (
    <Fragment>
      <div className="bg-black-dull">
        <Container className="flex flex-col items-center text-center md:py-28 py-10">
          <h1 className="text-4xl textGradient font-semibold">
            Crypto Market Maker SaaS Tool
          </h1>
          <p className="pt-5 text-base">
            Most projects fail within 6 months of listing on the secondary
            market due to arbitrage attacks and inside trading, Scorpoan-labs MM has
            the best anti-arbitrage protection to ensure your MM fund's safety.
            MyTrade MM's solution is to empower projects do in-house market
            making, not only can this solve the trust issue between your project
            and MM service provider, you can also save a lot of money. You have
            full control of our various MM bots that only access your account
            via trading APIs, with no withdrawal permissions. The MM features
            are designed for simplicity so anyone can become a qualified crypto
            Market Maker.
          </p>
        </Container>
      </div>
    </Fragment>
  );
};

export default Banner;
