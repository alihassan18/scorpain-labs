import { Testimonials } from "@/app/home";
import { Container } from "@/components/common";
import FaqComponent from "@/components/common/FAQcomponent";
import FaqComponent2 from "@/components/common/FAQcomponent2";
import React from "react";

const Faq = () => {
  return (
    <>
      <div className="sm:py-32 py-16 bg-[#4169E1]">
        <Container size="xl" className="flex items-center flex-col">
          <h1 className="text-[28px] font-slussen font-bold text-center text-white uppercase">
            Frequently Asked Questions
          </h1>
          <p className="text-center text-white text-[20px] font-slussen font-normal tracking-[0.34px] leading-[26.2px] max-w-[537px] mt-5">
            Please fill in the info below, our sales manager will contact you!
          </p>
          <div className="w-full max-w-[1290px] mt-12">
            <FaqComponent2 />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Faq;
