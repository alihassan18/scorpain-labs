import React, { useState } from "react";
import Star from "../Icons/Star";
import { SelectComponent } from "../index";

const SortFilter = () => {
  const [selected, setSelected] = useState();
  const data = [
    { label: "Newest", value: "" },
    { label: "Old", value: "" },
    { label: "Low Price", value: "" },
    { label: "Tom Cook", value: "" },
    { label: "High Price", value: "" },
  ];

  return (
    <div>
      <div className=" relative top-0 left-4  bg-white/80 shadow-2xl drop-shadow-2xl rounded-[20px] w-[30%] p-3.5">
        <div className=" flex justify-between gap-4 items-center">
          <SelectComponent
            Data={data}
            selected={selected}
            setSelected={setSelected}
            placeholder="Sort by"
            className="h-[44px] !border !border-[#E2E2E2]"
          />
          <i className="icon-cross cursor-pointer text-base  flex-shrink-0" />
        </div>
        <div className="h-[60vh]  overflow-auto AtScrollStyle">
          {Array(20)
            .fill(" ")
            ?.map((item, i: number) => (
              <div className="flex  gap-3 my-2">
                <img
                  src="/assets/images/mapview/m1.png"
                  alt="${location.title}"
                  className="w-[185px] h-[169px] rounded-[10px] "
                />
                <div>
                  <h3 className="text-[#333333] font-normal text-lg cursor-pointer">
                    Pelmen Käsitöö Kohvik
                  </h3>
                  <p className="text-xs text-[#666666] font-normal">
                    Balti Jaama Turg, Tallinn
                  </p>
                  <h2 className="text-[#333333] font-normal text-lg mt-2 ">
                    Description
                  </h2>
                  <p className="text-xs text-[#666666] font-normal">
                    Pelmen Käsitöö Kohvik is a café located in Tallinn, Estonia.
                    "Pelmen" refers to a type of Russian dumpling, and "Käsitöö"
                    means "handcrafted" in Estonian.
                  </p>
                  <div className="  flex gap-1.5 items-center mt-2.5 ">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SortFilter;
