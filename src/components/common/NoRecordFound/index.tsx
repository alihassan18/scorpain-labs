import React from "react";
const NoRecordFound = () => {
  return (
    <div className="w-full relative flex flex-col justify-center items-center min-h-[50vh] ">
      <img src="/assets/images/home/nodata.png" />
      <p className="tsm:ext-[22px] text-base text-[#666666] font-medium">
        No Record Found
      </p>
    </div>
  );
};

export default NoRecordFound;
