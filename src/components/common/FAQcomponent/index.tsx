"use client";
import React, { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
interface Disclosure {
  id: string;
  isOpen: boolean;
  question: string;
  ans: string;
}

const FaqComponent: React.FC = () => {
  const [disclosures, setDisclosures] = useState<Disclosure[]>([
    {
      id: "1",
      isOpen: false,
      question:
        "How is your MM Service different than other crypto market maker, why choose MyTrade MM?",
      ans: "A: There are three major benefits and differentiations: <br /> 1. Most web3 market makers on the market are 3rd party agencies, which operates in a black box, you have to blindly trust them. Issues arise when your MM funds starts to lose money, you are not sure if there is potential inside trading issues or external arbitrage bots attacked you. The benefit of our solution is that everything is transparent to you, you get to control your own assets, strategy, and trading data. This is will eliminate any trust issue and prevents inside trading.<br /> 2. We have the best anti-arbitrage protection, this means your MM funds are safe with us. You should know this fact, every token on the secondary market will be attacked by arbitrage bots until project dies. This is how 90%+ of the projects die on secondary market yet many founders are unaware of this issue. <br /> 3. We have the lowest price on the market, as low as $2500/month. We eliminated all the overhead and communication cost since we support projects for in-house MM.",
    },
    {
      id: "2",
      isOpen: false,
      question: "Do you provide tech support/training/human coverage service?",
      ans: "A: Training is provided for free on how to use our AI bots and dashboard, usually a 30-60minute training is needed at the start. There will be tech support 24/7 if there is any technical issues arise. Most of our clients choose in-house MM, however, there are situations that project team is too busy or want us to fully cover their MM needs, in this case we can provide full house MM service and help clients monitor all notifications and respond to these notifications for an extra fee of $2500/month/pair.",
    },
  ]);

  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    contentRefs.current = contentRefs.current.slice(0, disclosures.length);
  }, [disclosures]);

  const handleClick = (id: string) => {
    setDisclosures((prevDisclosures) =>
      prevDisclosures.map((d) =>
        d.id === id ? { ...d, isOpen: !d.isOpen } : { ...d, isOpen: false }
      )
    );
  };

  return (
    <div className="">
      {disclosures.map(({ id, isOpen, question, ans }, index) => (
        <div
          key={id}
          className="border border-black-400 mt-4  md:w-auto relative rounded-md"
        >
          <div
            onClick={() => handleClick(id)}
            aria-expanded={isOpen}
            {...(isOpen && { "aria-controls": id })}
            className=" cursor-pointer"
          >
            <div className="flex-1 w-full cursor-pointer">
              <div
                className={`flex bg-black-400 py-2 px-4 justify-between rounded-md items-start w-full ${
                  isOpen && "rounded-t-md !rounded-b-none"
                }`}
              >
                <h5 className="font-medium sm:text-xl text-lg text-white">
                  {question}
                </h5>

                <div className={`transition-[6s] text-white`}>
                  <IoMdArrowDropdown
                    className={`lg:w-[32px] lg:h-[32px] md:w-[25px] md:h-[25px] w-[19px] h-[19px] ${
                      isOpen && "rotate-180"
                    }`}
                  />
                </div>
              </div>
              <div
                className={`AtAnswer ${isOpen ? "AtOpen" : ""}`}
                //@ts-ignore
                ref={(el) => (contentRefs.current[index] = el)}
                style={
                  isOpen
                    ? { maxHeight: contentRefs.current[index]?.scrollHeight }
                    : { maxHeight: 0 }
                }
              >
                <p className="font-normal text-base text-white/50 p-4">
                  <div dangerouslySetInnerHTML={{ __html: ans }} />
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqComponent;
