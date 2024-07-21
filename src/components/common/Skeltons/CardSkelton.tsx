import React from "react";

function CardSkelton() {
  return (
    <div className="relative animate-pulse rounded-md  border-borderColor shadow-lg bg-lightBg dark:bg-dark">
      <div className="h-[210px] round aspect-w-4 aspect-h-3 z-20 rounded-t-md bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-3">
        <div className="flex items-center gap-2 justify-between">
          <div className="h-5 z-20 w-[70%] bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-5 z-20 w-[20%] bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="h-5 z-20 w-[60%] bg-gray-200 dark:bg-gray-700 mt-3"></div>
        <div className="h-5 z-20 w-[40%] bg-gray-200 dark:bg-gray-700 mt-3"></div>
      </div>
    </div>
  );
}
export default CardSkelton;
