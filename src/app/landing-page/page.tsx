import React, { Fragment } from "react";
import Header from "./(landingPage)/Header";
import Banner from "./(landingPage)/Banner";
import StatusSection from "./(landingPage)/StatusSection";
import OurMission from "./(landingPage)/OurMission";
import CashOut from "./(landingPage)/CashOut";
import TradeView from "./(landingPage)/TradeView";
import Services from "./(landingPage)/Services";
import Prices from "./(landingPage)/Prices";

const LandingPage: React.FC = () => {
  return (
    <Fragment>
      <Header />
      <Banner />
      <StatusSection />
      <OurMission />
      <CashOut />
      <TradeView />
      <Services />
      <Prices />
    </Fragment>
  );
};

export default LandingPage;
