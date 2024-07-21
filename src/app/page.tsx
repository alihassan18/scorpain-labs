import Aboutus from "./home/components/Abouts";
import Frendsmap from "./home/components/Frendsmap";
import HappyCustomers from "./home/components/HappyCustomers";
import {
  Banner,
  FAQ,
  FriendsMap,
  HotSpots,
  PointofInterest,
  YourLoneliness,
  Recomendation,
} from "./home/components/index";
// import SearchFilter from "@/components/common/SearchFilter"

export default function Home() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta
        name="title"
        content="Yolo Selection: Travel Recommendations Made Personal by Friends & Influencers"
      />
      <title>
        Yolo Selection: Travel Recommendations Made Personal by Friends &
        Influencers
      </title>
      <meta
        name="description"
        content="Ditch impersonal reviews! Yolo Selection curates travel recommendations from friends & influencers you trust. Explore, collaborate & find unique experiences in every city."
      />
      <meta
        name="keywords"
        content="Personalized travel recommendations, Travel recommendations from friends, Travel recommendations from influencers, Travel social network, Hidden gem travel destinations, Friend-based travel planning, Influencer travel recommendations, Personalized travel app, Travel inspiration, Unique travel experiences"
      />
      <link rel="canonical" href="https://artofyolo-staging.vercel.app/" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Yolo Selection" />
      <meta
        property="og:title"
        content="Yolo Selection: Travel Recommendations Made Personal by Friends & Influencers"
      />
      <meta
        property="og:description"
        content="Ditch impersonal reviews! Yolo Selection curates travel recommendations from friends & influencers you trust. Explore, collaborate & find unique experiences in every city."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://artofyolo-staging.vercel.app/" />
      <meta property="og:image" content="/assets/images/artofyolo.png" />
      {/* <meta property="og:image:secure_url" content="URL_TO_SECURE_IMAGE" /> */}
      <meta
        name="twitter:url"
        content="https://artofyolo-staging.vercel.app/"
      />
      <meta
        name="twitter:title"
        content="Yolo Selection: Travel Recommendations Made Personal by Friends & Influencers"
      />
      <meta
        name="twitter:description"
        content="Ditch impersonal reviews! Yolo Selection curates travel recommendations from friends & influencers you trust. Explore, collaborate & find unique experiences in every city."
      />
      <meta name="twitter:image" content="/assets/images/artofyolo.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image:alt" content="Yolo Selection" />
      <div className="w-full overflow-hidden">
        <Banner />
        <Aboutus />
        <Frendsmap />
        <div className=" relative ">
          <img
            src="/assets/images/home/bg.png"
            className="absolute md:block hidden  top-0  w-full h-full"
            alt=""
          />
          <img
            src="/assets/images/home/bg-tablet.png"
            className="absolute md:hidden block  xs:hidden  top-0  w-full h-full"
            alt=""
          />
          <img
            src="/assets/images/home/bg-mbl.png"
            className="h-full w-full   hidden xs:block absolute   top-0 -z-30"
            alt=""
          />
          <HotSpots />
          <PointofInterest />
        </div>
        <Recomendation />
        <HappyCustomers />
        <FAQ />
        <YourLoneliness />
        {/* <SearchFilter/> */}
      </div>
    </>
  );
}
