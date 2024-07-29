import { Container } from "@/components/common";
import React, { Fragment } from "react";

const data = [
  //   {
  //     title: "100+ Clients Served",
  //     description:
  //       "Engaged in collaboration with more than 500 digital asset issuers.",
  //   },
  {
    title: "7+ Exchanges",
    description:
      "Currently operational and actively trading on a diverse network of exchanges.",
  },
  {
    title: "24/7 Coverage",
    description:
      "Global market coverage across all exchanges, ensuring round-the-clock availability.",
  },
];

const StatusSection: React.FC = () => {
  return (
    <Fragment>
      <div className="bg-[#16234B] py-[65px]">
        <Container size="xl">
          {data.length > 0 &&
            data.map((item, index) => {
              const lastChild = data.length - 1 === index;
              return (
                <div
                  className={`flex gap-5 items-center py-[61px] border-t border-white/15 ${
                    lastChild && "border-b"
                  }`}
                  key={index}
                >
                  <h2 className="text-white text-6xl leading-[72px] tracking-[-2.16px] font-slussen">
                    {item.title}
                  </h2>
                  <p className="text-[#71C2FF] text-base font-medium font-inter uppercase leading-[25.6px] tracking-[0.96px] max-w-[330px]">
                    {item.description}
                  </p>
                </div>
              );
            })}
        </Container>
      </div>
    </Fragment>
  );
};

export default StatusSection;