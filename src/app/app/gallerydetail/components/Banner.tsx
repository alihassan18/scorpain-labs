import React from "react";
import GallerySlider from "@/components/common/Gallery Slider";
import { addCommasToNumberString, formatRattingNumber } from "@/lib/utils";

export default function Banner({ poi }: { poi: any }) {
  return (
    <>
      <GallerySlider poi={poi} />
      <div className="md:px-6 flex flex-col gap-5 py-5 md:py-10">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h1 className="font-bold text-3xl text-black">{poi?.title}</h1>
          </div>
          <div className="flex justify-center items-center gap-3 mt-4 md:mt-0">
            <i className="icon-fillstar text-[#ffd33c] text-base"></i>
            <h1 className="font-semibold text-base">
              {formatRattingNumber(poi?.google_rating)} Stars
            </h1>
            <div className="w-[1.5px] h-[16px] bg-black"></div>
            <h1 className="text-[#007ACE] font-semibold text-base underline">
              {poi?.google_reviews ? addCommasToNumberString(poi?.google_reviews) : 0 } Reviews
            </h1>
          </div>
        </div>
        {poi?.long_desc && (
          <h1 className="text-[22px] md:text-xl lg:text-[22px] font-semibold">
            {poi?.long_desc}
          </h1>
        )}

        {/* <div className=' flex gap-3'>

                    <ImageComponent
                        src="/assets/images/home/facebook.svg"
                        fill
                        figClassName="w-[50px] h-[50px] rounded-full "
                        className="object-contain"
                        alt=""
                    />
                    <ImageComponent
                        src="/assets/images/home/organization 1.svg"
                        fill
                        figClassName="w-[55px] h-[55px] rounded-full"
                        className="object-contain"
                        alt=""
                    />
                    <ImageComponent
                        src="/assets/images/home/twitter 1.svg"
                        fill
                        figClassName="w-[50px] h-[50px] rounded-full "
                        className="object-contain"
                        alt=""
                    />
                    <ImageComponent
                        src="/assets/images/home/instagram 1.svg"
                        fill
                        figClassName="w-[55px] h-[55px] rounded-full"
                        className="object-contain"
                        alt=""
                    />
                </div> */}
        {/* <h1 className='text-[22px] font-semibold'>Amenities</h1>
                <div className='w-full h-[0.5px] border'></div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className='flex gap-5'>
                        <Dollar />
                        <h1 className='font-semibold text-base'>Collection possible</h1>
                    </div>
                    <div className='flex gap-5'>
                        <i className='icon-location1 text-2xl'></i>
                        <h1 className='font-semibold text-base'>No reservations</h1>
                    </div>
                    <div className='flex gap-5'>
                        <Location />
                        <h1 className='font-semibold text-base'>Chic</h1>
                    </div>
                    <div className='flex gap-5'>
                        <i className='icon-clock1 text-2xl'></i>
                        <h1 className='font-semibold text-base'>Suitable for groups</h1>
                    </div>
                </div> */}
      </div>
    </>
  );
}
