import React from "react";
import Banner from "./Banner";
import Reviews from "./Reviews";
import Cards from "./Cards";

export default function leftsidebar({ poi }: { poi: any }) {
  return (
    <>
      <Banner poi={poi} />
      {poi?.tags?.length && (
        <div className="md:px-6 pb-5 md:py-9">
          <h3 className="font-semibold text-[22px] leading-[28px] border-b pb-5">
            Tags
          </h3>

          <p className="mt-6 text-lg font-normal flex gap-2">
            {poi?.tags &&
              poi.tags.map((t: string, index: number) => (
                <span key={index}>{t},</span>
              ))}
          </p>
        </div>
      )}

      <Reviews poi={poi} />
      {/* <Cards poi={poi}/> */}
    </>
  );
}
