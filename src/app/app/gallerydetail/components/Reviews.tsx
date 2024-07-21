"use client";
import Stardetail from "@/components/common/Icons/Stardetail";
import StarRating from "@/components/common/Ratings/index";
import Rating from "@/components/common/Ratnigbar";
import RatingBar from "@/components/common/Ratnigbar/index";
import { addCommasToNumberString } from "@/lib/utils";
import React from "react";

export default function Reviews({ poi }: { poi: any }) {
  return (
    <div className="md:px-6 pb-5 md:py-9">
      <div className="font-semibold text-[22px] leading-[28px] border-b pb-5">
        Reviews and Ratting
      </div>
      <div className="flex lg:flex-row w-full md1:flex-col md:flex-col items-center sm:flex-col xs:flex-col">
        <div className="flex pt-6 text-center gap-[76px] w-[70%] justify-center">
          <div className="pt-6  items-center space-y-4">
            <h3 className="font-semibold text-sm pt-3">
              Overall Rating & Reviews
            </h3>
            <div className="font-roboto font-medium text-[57px] p-3 text-[#007ACE] leading-[66.8px]">
              {poi?.overall_rating?.toFixed(0) ?? 0.0}
            </div>
            <div className=" pb-6">
              <StarRating rating={poi?.overall_rating?.toFixed(0) ?? 0} />
            </div>
            <div className="font-semibold text-sm">
              Based on {addCommasToNumberString(poi?.overall_review) ?? 0} reviews
              {/* <span className="text-[#007ACE] underline cursor-pointer">
                Rate now
              </span> */}
            </div>
          </div>
        </div>
        {/* <div className=" w-full pt-5">
          <div className=" flex w-full items-center pt-6 ">
            <h5 className="font-semibold text-xs mx-3">Dinning</h5>
            <StarRating />
            <div className=" flex items-center w-full">
              <div className="  p-4 w-full">
                <RatingBar />
              </div>

              <div className="text-xs font-semibold py-1 ml-auto text-blue-600">
                53
              </div>
            </div>
          </div>{" "}
          <div className=" flex w-full items-center py-9">
            <h5 className="font-semibold text-xs  mx-3 ">Delivery</h5>
            <StarRating />
            <div className=" flex items-center w-full">
              <div className="  p-4 w-full">
                <RatingBar />
              </div>
              <div className="text-xs font-semibold py-1 ml-auto text-blue-600">
                53
              </div>
            </div>
          </div>
          <div className=" flex w-full items-center">
            <h5 className="font-semibold text-xs  mx-3">Takeaway</h5>
            <StarRating />
            <div className=" flex items-center w-full">
              <div className="  p-4 w-full">
                <RatingBar />
              </div>

              <div className="text-xs font-semibold py-1 ml-auto text-blue-600">
                53
              </div>
            </div>
          </div>
          <div className=" flex w-full items-center  py-9">
            <h5 className="font-semibold text-xs  mx-3">Service</h5>
            <StarRating />
            <div className=" flex items-center w-full">
              <div className="  p-4 w-full">
                <RatingBar />
              </div>

              <div className="text-xs font-semibold py-1 ml-auto text-blue-600">
                53
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
