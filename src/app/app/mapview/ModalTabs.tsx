"use client";
import { useState, ReactNode } from "react";
interface Tab {
  title: string;
  content: ReactNode;
}
interface TabsProps {
  tabs: Tab[];
}

const ModalTabs: React.FC<TabsProps> = ({ tabs }) => {
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="tabs-container w-full pr-5">
      <div className="flex space-x-6 justify-start  max-w-[477px] mx-auto">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`cursor-pointer py-2 pb-3 relative text-center whitespace-nowrap text-black text-base font-bold ${
              index === activeTab ? "text-primary" : ""
            }`}
            onClick={() => handleTabClick(index)}
          >
            <p
              className={` font-normal text-sm ${
                index === activeTab ? "text-primary" : "text-secondary"
              }`}
            >
              {tab.title}
            </p>
            {index === activeTab ? (
              <div className="absolute primary h-[4px] rounded-full w-full bottom-0 left-0 z-10"></div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      <div className="mt-4">{tabs[activeTab].content}</div>
    </div>
  );
};

export default ModalTabs;
