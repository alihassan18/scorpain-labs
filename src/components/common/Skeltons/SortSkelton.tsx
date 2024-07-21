import React from "react";

function SortSkelton() {
  return (
    <div className="relative animate-pulse  rounded-xl  border border-bg-dark overflow-hidden shadow-lg bg-lightBg dark:bg-dark">
      <div className="w-full h-[81px] rounded-t-lg  object-cover !flex-shrink-0 bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-3">
        <div className="flex items-center gap-2 justify-between">
          <div className="h-3 z-20 w-[70%] bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-3 z-20 w-[20%] bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="h-3 z-20 w-[60%] bg-gray-200 dark:bg-gray-700 mt-3"></div>
        <div className="h-3 z-20 w-[40%] bg-gray-200 dark:bg-gray-700 mt-3"></div>
        <div className="flex items-center gap-2 justify-between mt-2">
          <div className="h-3 z-20 w-[70%] bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-3 z-20 w-[20%] bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
}
export default SortSkelton;
