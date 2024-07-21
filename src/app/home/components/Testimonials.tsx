import React from "react";
import { Container } from "@/components/common/index";
import { FaUserTie } from "react-icons/fa";

const data = [
  {
    id: 1,
    icon: <FaUserTie />,
    title: "Founder of SCY",
    description:
      "MyTrade was extremely helpful getting everything setup and explaining the onboarding process. I learned quite a bit about MM from our conversations. After we got setup you continued to help us refine the process letting us know what the notifications were and any concerns you had and how we could avoid them. Overall, it has been a really high touch experience which is uncommon with any Web3 vendors or service providers we have used. I could not recommend MyTrade MM services more for the ease of use, high functionality, and amazing customer service.",
  },
  {
    id: 2,
    icon: <FaUserTie />,
    title: "Founder of a BitMart project",
    description:
      "MyTrade provides several mechanic tools that are very user-friendly, convinient and useful. One of the benefits is that it can help user to prevent price swing from attackers and bots that normally is difficult to manually response. It's like a personal assistance that user has a full control 24/7 and totally worth for its price. Looking forward to see more updates in the future from MyTrade team.",
  },
];
const Testimonials = () => {
  return (
    <div className="relative bg-black-mid">
      <Container className="md:py-28 py-10">
        <div className="">
          <h1 className="text-4xl textGradient font-semibold text-center">
            Testimonials
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {data.length > 0 &&
              data.map((item, index) => {
                return (
                  <div
                    className="rounded-md bg-black-200 p-7 flex flex-col justify-between"
                    key={index}
                  >
                    <p className="text-base font-normal text-white/50">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-4 mt-6">
                      <span className="flex justify-center items-center text-2xl h-12 w-12 rounded-full text-white bg-black-mid">
                        {item.icon}
                      </span>
                      <h3 className="font-semibold text-base text-primary">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Testimonials;
