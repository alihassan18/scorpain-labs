import React from "react";
import Score from "./score";
import { ImageComponent } from "@/components/common";
import ModalTabs from "./ModalTabs";
import NormalGuid from "./NormalGuid";


export default function index() {
  const tabData = [
    { title: "Scores", content: <Score /> },
    { title: "Digital Normal Guide", content: <NormalGuid /> },
    {
      title: "People",
      content: (
        <div className="min-h-[62vh]">
          <h2 className="text-3xl px-4">Coming Soon...</h2>
        </div>
      ),
    },
    {
      title: "Pros & Cons",
      content: (
        <div className="min-h-[62vh]">
          <h2 className="text-3xl px-4">Coming Soon...</h2>
        </div>
      ),
    },
    {
      title: "Weather",
      content: (
        <div className="min-h-[62vh]">
          <h2 className="text-3xl px-4">Coming Soon...</h2>
        </div>
      ),
    },
    {
      title: "Reviews",
      content: (
        <div className="min-h-[62vh]">
          <h2 className="text-3xl px-4">Coming Soon...</h2>
        </div>
      ),
    },
  ];
  return (
    <>
      <div>
        <div className="relative">
          <ImageComponent
            src="/assets/images/mapview/m1.png"
            alt=""
            className=""
            figClassName="w-full h-[238px]"
            fill
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-white font-medium text-[62px] capitalize">
              Balti Jaama Turg
            </p>
            <p className="text-white mt-5">Tallinn</p>
          </div>
        </div>
        <ModalTabs tabs={tabData} />
        <div>


        </div>
      </div>
    </>
  );
}
