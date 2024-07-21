import { Container, ImageComponent } from "@/components/common/index";
import React from "react";

const Aboutus = () => {
  return (
    <div className="relative" id="about">
      <img
        src="/assets/images/aboutusbg.png"
        className="h-full w-full absolute  object-cover top-0 -z-30"
        alt=""
      />
      <Container>
        <div className="text-center">
          <h1 className="h2 lg:pt-20 md:pt-[60px] pt-[30px]">About Us</h1>
          <p className="  lg:py-8 md:py-6  py-4  max-w-[907px] text-center mx-auto">
            Yolo Selection is an invite-only travel community offering
            personalized recommendations from friends and influencers,
            connecting users to top destinations and hidden gems worldwide.
          </p>
          <ImageComponent
            src={"https://res.cloudinary.com/dz7sec6n3/image/upload/v1720783234/static/iutprdsvctlkltgoo38t.jpg"}
            width={1363}
            className=""
            height={622}
          />
        </div>
      </Container>
    </div>
  );
};

export default Aboutus;
