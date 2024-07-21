import React from 'react'

export default function BioSkeltonSm() {
    return (
        <>
            <div className="relative animate-pulse rounded-md flex gap-3   xs:block">
                <div className=' w-full flex gap-2'>
                    <div className="h-[44px] w-[44px] rounded-full  z-20  bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
                    <div className=' w-full flex flex-col gap-2 justify-center'>
                        <div className="h-2 w-32 z-20 bg-gray-200 dark:bg-gray-700 "></div>
                        <div className="h-2 w-[95%] z-20 bg-gray-200 dark:bg-gray-700 "></div>
                    </div>
                </div>

            </div>
        </>
    )
}
