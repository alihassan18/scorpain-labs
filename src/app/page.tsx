// import {
//   Banner,
//   FAQ,
//   VipServices,
//   Testimonials,
//   ApplyMyTrade,
//   BasicServices,
// } from "./home/index";
import Apply from "./landing-page/(landingPage)/Apply";
import Banner from "./landing-page/(landingPage)/Banner";
import CashOut from "./landing-page/(landingPage)/CashOut";
import Faq from "./landing-page/(landingPage)/Faq";
import OurMission from "./landing-page/(landingPage)/OurMission";
import PartnerExchange from "./landing-page/(landingPage)/PartnerExchange";
import Prices from "./landing-page/(landingPage)/Prices";
import Services from "./landing-page/(landingPage)/Services";
import ServiceTestimonials from "./landing-page/(landingPage)/ServiceTestimonials";
import StatusSection from "./landing-page/(landingPage)/StatusSection";
import TradeView from "./landing-page/(landingPage)/TradeView";

export default function Home() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="title" content="Scorpion Lab" />
      <title>Scorpion Lab</title>
      <meta name="description" content="Scorpion Lab" />
      <meta name="keywords" content="Scorpion Lab" />
      {/* <link rel="canonical" href="https://artofyolo-staging.vercel.app/" /> */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Scorpion Lab" />
      <meta property="og:title" content="Scorpion Lab" />
      <meta property="og:description" content="Scorpion Lab" />
      <meta property="og:type" content="website" />
      {/* <meta property="og:url" content="https://artofyolo-staging.vercel.app/" /> */}
      {/* <meta property="og:image" content="/assets/images/artofyolo.png" /> */}
      {/* <meta property="og:image:secure_url" content="URL_TO_SECURE_IMAGE" /> */}
      {/* <meta
        name="twitter:url"
        content="https://artofyolo-staging.vercel.app/"
      /> */}
      {/* <meta
        name="twitter:title"
        content="Scorpion Lab"
      />
      <meta
        name="twitter:description"
        content="Ditch impersonal reviews! Yolo Selection curates travel recommendations from friends & influencers you trust. Explore, collaborate & find unique experiences in every city."
      />
      <meta name="twitter:image" content="/assets/images/artofyolo.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image:alt" content="Yolo Selection" /> */}
      <div className="w-full">
        <Banner />
        <StatusSection />
        <OurMission />
        <CashOut />
        <TradeView />
        <Services />
        <Prices />
        <PartnerExchange />
        <ServiceTestimonials />
        <Apply />
        <Faq />
        {/* <Banner />
        <BasicServices />
        <VipServices />
        <Testimonials />
        <ApplyMyTrade />
        <FAQ /> */}
      </div>
    </>
  );
}
