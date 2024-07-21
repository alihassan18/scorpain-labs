import React from "react";

function FriendsSkelton() {
  return (
    <>
      {Array(12)
        .fill("")
        .map((item, i) => (
          <div className="relative animate-pulse rounded-[20px] flex  sm:flex-row flex-col gap-3 items-center p-4  shadow-lg bg-lightBg dark:bg-dark">
            <div className="md:h-[80px] md:w-[80px] sm:mt-0 -mt-8 sm:h-[60px] sm:w-[60px] h-[50px] w-[50px] rounded-full flex-shrink-0  z-20  bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex flex-col gap-2 w-20">
              <div className="h-3 z-20  bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-2 z-20 w-[85%]  bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-[38px] w-[105px] rounded-md z-20 bg-gray-200 dark:bg-gray-700 "></div>
            </div>
          </div>
        ))}
    </>
  );
}
export default FriendsSkelton;
