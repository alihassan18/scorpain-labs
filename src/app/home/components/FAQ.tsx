import React from "react";
import FaqComponent from "@/components/common/FAQcomponent";
import { Container } from "@/components/common/index";

export default function FAQ() {
  return (
    <div className="bg-black-mid">
      <Container className="md:py-28 py-10">
        <h1 className="text-4xl textGradient text-center font-semibold">FAQ</h1>
        <div className="flex flex-col items-center mt-16">
          <FaqComponent />
        </div>
      </Container>
    </div>
  );
}
