import React from "react";

function BioSkelton() {
    return (
        <>
            <div className="relative animate-pulse rounded-md flex flex-col gap-3  items-center pb-5 ">
                <div className="h-[152px] w-[152px] rounded-full round aspect-w-4 aspect-h-3 z-20  bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
                <div className="h-3 w-40 z-20  bg-gray-200 dark:bg-gray-700 mt-3"></div>
                <div className="w-full ">
                    <div className="h-2 w-[100%] z-20  bg-gray-200 dark:bg-gray-700 mt-3"></div>
                    <div className="h-2 w-[80%] z-20  bg-gray-200 dark:bg-gray-700 mt-3"></div>
                </div>
            </div>


        </>
    );
}
export default BioSkelton;
