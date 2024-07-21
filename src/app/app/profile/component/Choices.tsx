"use client";
import React, { useState, useEffect } from "react";

interface IProps {
  data: Array<{ name: string, key: string, url: string }>;
  value: string | undefined;
  update: (value: string) => void;  // Define a more specific function type
}

const Choices = ({ data, value, update }: IProps) => {
  const [select, setSelect] = useState<string>(value || "");

  // Sync local state with props value if it changes externally
  useEffect(() => {
    setSelect(value || "");
  }, [value]);

  const handleSelect = (selectedValue: string) => {
    setSelect(selectedValue);
    update(selectedValue);
  };

  return (
    <>
      {data.map((item: any, index: number) => (
        <div
          key={index}
          onClick={() => handleSelect(item.name)}
          className={`${
            select === item.name ? "AtBtn text-white" : ""
          } text-base xs:text-xs rounded-full font-medium text-secondary py-2 px-3 xs1:px-1.5 cursor-pointer bg-[#FAFAFA] flex items-center gap-2`}
        >
          <img src={item.url} alt={item.name} className="flex-shrink-0 xs1:h-3 w-3" />
          {item.name}
        </div>
      ))}
    </>
  );
};

export default Choices;
