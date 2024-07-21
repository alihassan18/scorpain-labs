"use client";
import { ImageComponent } from "@/components/common";
import React, { useEffect, useRef } from "react";
import axiosInstance from "@/api/http";
import mapboxgl from "mapbox-gl";
import { RatingAgoda, RatingTripadvisor } from "@/components/common/index";
import { useParams } from "next/navigation";
import createCustomMarkerElement from "@/components/ui/CustomMarkerElement";
import { MAP_DATA } from "@/utils/constants";
import { addCommasToNumberString } from "@/lib/utils";

export default function rightsidebar({ poi }: { poi: any }) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const params = useParams();
  const { id: poiId } = params;

  let centerCoordinates = [24.7536, 59.437]; // Tallinn city center coordinates

  if (poi.map_coordinates) {
    const [lng, lat] = poi.map_coordinates
      .split(",")
      .map((coord: string) => parseFloat(coord.trim()));
    centerCoordinates = [lng, lat];
  }

  useEffect(() => {
    mapboxgl.accessToken = MAP_DATA.accessToken;
    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: MAP_DATA.theme,
      // @ts-ignore
      center: centerCoordinates,
      zoom: 16,
    });

    map.on("load", () => {
      loadDataAndAddMarkers(map);
    });
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    return () => map.remove();
  }, []);

  const loadDataAndAddMarkers = (map: any) => {
    axiosInstance
      .get(`/poi/${poiId}`)
      .then((response: any) => {
        const data = response.data;

        const marker = new mapboxgl.Marker({
          element: createCustomMarkerElement(data.images[0]),
        })
          .setLngLat(data?.map_coordinates?.split(",").reverse()) // reverse is used to manage the format of coordinates
          .addTo(map);

        map.setCenter(data?.map_coordinates?.split(",").reverse());
      })
      .catch((error: any) => {
        console.log("Error while fetching", error);
      });
  };

  return (
    <>
      <h1 className="font-normal text-[22px]">Location</h1>
      <div className="border border-[#BCBBDC] rounded-[20px] p-5">
        <div className="flex">
          {/* <div className="">
            <i className="icon-clock1 text-2xl"></i>
          </div> */}

          {/* <div className=" flex w-full flex-col mt-2 pr-14">
            <div className=" font-semibold text-base pl-4">Timing</div>
            <div className=" flex font-normal text-sm justify-between pl-5 pt-5 ">
              <h1>Tuesday</h1>
              <h1>12:00 PM - 10:00 PM</h1>
            </div>
            <div className=" flex font-normal text-sm justify-between pl-5 pt-4 ">
              <h1>Monday</h1>
              <h1>12:00 PM - 10:00 PM</h1>
            </div>
            <div className=" flex font-normal text-sm justify-between pl-5 pt-4 ">
              <h1>Wednesday</h1>
              <h1>12:00 PM - 10:00 PM</h1>
            </div>
            <div className=" flex font-normal text-sm justify-between pl-5 pt-4 ">
              <h1>Thursday</h1>
              <h1>12:00 PM - 10:00 PM</h1>
            </div>
            <div className=" flex font-normal text-sm justify-between pl-5 pt-4 ">
              <h1>Friday</h1>
              <h1>12:00 PM - 10:00 PM</h1>
            </div>
            <div className=" flex font-normal text-sm justify-between pl-5 pt-4 ">
              <h1>Saturday</h1>
              <h1>12:00 PM - 10:00 PM</h1>
            </div>
            <div className=" flex font-normal text-sm justify-between pl-5 pt-4 ">
              <h1>Sunday</h1>
              <h1>12:00 PM - 10:00 PM</h1>
            </div>
          </div> */}
        </div>
        <div className="flex">
          {/* <div className="mt-2">
            <Location />
          </div> */}
          <div className="flex w-full flex-col">
            {/* <div className="font-semibold text-base pl-4">Location</div> */}

            <div className="rounded-xl">
              <div ref={mapContainer} className="w-full h-[200px] rounded-xl" />

              <div className="flex flex-col sm:flex-row justify-between items-start pt-4">
                <div>
                  <h1 className="font-normal text-sm text-[#333333]">
                    {poi?.city}
                  </h1>
                  <p className="font-normal text-sm text-[#848484]">
                    {poi?.country && poi?.country[0]}
                    {poi?.continent ? `,${poi?.continent}` : ""}
                  </p>
                  {/* <p className="font-normal text-sm text-[#848484]">
                    De Pijp, South
                  </p> */}
                </div>
                <div className="flex items-start mt-2 md:mt-0">
                  <button className="font-semibold text-sm rounded-3xl px-4 py-2 AtBtn text-white border">
                    See Route
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1 className="font-normal text-[22px]">Multi-Source Ratings</h1>
      <div className="border rounded-[20px] p-5">
        {/* <h1 className="font-semibold text-3xl">Trustpilot</h1>
        <div className="flex flex-col  justify-center items-center py-14 gap-2">
          <h1 className="font-semibold text-lg">Excellent</h1>
          <div className=" flex gap-3">
            <RatingAgoda trustpilot />
          </div>
          <div className="flex gap-2">
            <h1 className="font-light text-sm text-[#848484]">Based on</h1>
            <h1 className="font-bold text-sm text-black underline">
              456 reviews
            </h1>
          </div>
          <div className="flex gap-1">
            <ImageComponent
              src="/assets/images/app/Shape2.svg"
              fill
              figClassName="w-[25.3px] h-[24px] "
              className="object-contain"
              alt=""
            />
            <h1 className="font-bold text-lg">Trustpilot</h1>
          </div>
        </div> */}

        <div className="border-t">
          <h1 className="font-semibold text-3xl pt-5">Agoda</h1>
          <div className="flex flex-col  justify-center items-center py-14 gap-2">
            <h1 className="font-semibold text-lg">
              Rating {poi?.agoda_rating ?? 0}
            </h1>
            <div className=" flex gap-3">
              <RatingAgoda />
            </div>
            <div className="flex gap-2">
              <h1 className="font-light text-sm text-[#848484]">Based on</h1>
              <h1 className="font-bold text-sm text-black underline">
                {addCommasToNumberString(poi?.agoda_reviews) ?? 0} reviews
              </h1>
            </div>

            <ImageComponent
              src="/assets/images/app/agoda.svg"
              fill
              figClassName="w-[65.5px] h-[26px] "
              className="object-contain"
              alt=""
            />
          </div>
        </div>

        <h1 className="font-semibold text-3xl">Tripadvisor</h1>
        <div className="flex flex-col  justify-center items-center py-14 gap-2">
          <h2 className="font-semibold text-lg">
            Rating {poi?.tripadvisor_rating ?? 0.0}
          </h2>
          <div className="flex">
            <RatingTripadvisor disableClick={true} />
          </div>

          <div className="flex gap-2">
            <h1 className="font-light text-sm text-[#848484]">Based on</h1>
            <h1 className="font-bold text-sm text-black underline">
              {addCommasToNumberString(poi?.tripadvisor_reviews) ?? 0} reviews
            </h1>
          </div>
          <ImageComponent
            src="/assets/images/app/tripadvisor.svg"
            fill
            figClassName="w-[121.33px] h-[26px] "
            className="object-contain"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
