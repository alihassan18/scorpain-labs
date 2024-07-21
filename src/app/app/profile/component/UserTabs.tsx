"use client";
import { useState, ReactNode } from "react";
interface Tab {
  label: string;
  title: string;
  content: ReactNode;
}
interface TabsProps {
  tabs: Tab[];
  setActiveTab: Function;
  activeTab: number;
}

const USerTabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  return (
    <div className="tabs-container max-w-[500px] sm:max-w-full overflow-auto">
      <div className="flex space-x-10 xl:space-x-[70px] justify-start  ">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`cursor-pointer px-4 py-2 pb-3 relative text-center whitespace-nowrap text-black text-base font-bold ${
              index === activeTab ? "gradient-text" : ""
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
            <p
              className={`text-secondary font-normal text-sm ${
                index === activeTab ? "gradient-text" : ""
              }`}
            >
              {tab.title}
            </p>
            {index === activeTab ? (
              <div className="absolute AtBtn h-[4px] rounded-full w-full bottom-0 left-0 z-10"></div>
            ) : (
              <div className="absolute border border-transparent  h-[4px] rounded-full w-full bottom-0 left-0 z-10"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default USerTabs;
