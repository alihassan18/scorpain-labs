import React from "react";
import FaqComponent from "@/components/common/FAQcomponent";
import { Container } from "@/components/common/index";

export default function FAQ() {
  return (
    <div className="relative" id="faqs">
      <img
        src="/assets/images/home/faqbg.png"
        className="h-full w-full absolute    top-0 -z-30"
        alt=""
      />
      <Container>
        <div className=" flex flex-col items-center lg:pt-28 py-12 sm:py-24  ">
          <h1 className="h2 text-center">Frequently Asked Questions</h1>
          <p className=" font-normal text-[#9A9A9A] mt-4">
            Your queries, answered succinctly.
          </p>
          <FaqComponent />
        </div>
      </Container>
    </div>
  );
}
