"use client";
import React, { useState, useRef, useEffect } from "react";
import { Mines, Plus } from "../Icons";
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
        "What makes Yolo Selection different from other travel platforms?",
      ans: "Yolo Selection stands out by delivering personalized recommendations sourced from trusted friends and influencers, ensuring each suggestion resonates with your distinct preferences. It's a travel platform designed to cater specifically to your individual tastes and desires.",
    },
    {
      id: "2",
      isOpen: false,
      question: "How are locations ranked on Yolo Selection?",
      ans: "Unlike other travel review sites that offer general ratings from the mainstream audience, Yolo Selection focuses on personalized recommendations from your friends and influencers you trust. This makes the information more relevant and tailored to your unique preferences.",
    },
    {
      id: "3",
      isOpen: false,
      question: "Can I connect with friends on Yolo Selection?",
      ans: "The world map feature shows you where your friends are around the globe, helping you stay connected and plan trips together. This is particularly useful for digital nomads and frequent travelers with a wide network of friends across different countries.",
    },
    {
      id: "4",
      isOpen: false,
      question: "How does Yolo Selection personalize travel recommendations?",
      ans: "Yolo Selection is an invite-only community. If you haven’t received an invite, you can request one by signing up on our website. Once approved, you’ll be able to explore and contribute to our growing travel network.",
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
    <div className="mt-5 md:mt-8 lg:mt-10">
      {disclosures.map(({ id, isOpen, question, ans }, index) => (
        <div
          key={id}
          className="border shadow-xl mt-4 lg:w-[948px] md:w-auto relative rounded-[20px] p-[1.6px]"
        >
          <div
            onClick={() => handleClick(id)}
            aria-expanded={isOpen}
            {...(isOpen && { "aria-controls": id })}
            className="  bg-white border-3 border-gradient-custom rounded-[20px] cursor-pointer"
          >
            <div className="flex-1 w-full py-7 px-5 cursor-pointer">
              <div className=" flex justify-between items-start w-full">
                <h5 className="font-medium sm:text-xl text-lg">{question}</h5>

                <div className={` transition-[6s] mt-2`}>
                  {isOpen ? (
                    <Mines className="lg:w-[32px] lg:h-[32px] md:w-[25px] md:h-[25px] w-[19px] h-[19px]" />
                  ) : (
                    <Plus className="lg:w-[32px] lg:h-[32px] md:w-[25px] md:h-[10px] w-[19px] h-[19px]" />
                  )}
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
                <p className="font-normal text-base text-[#333333] py-6 ">
                  {ans}
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
