"use client";
import axiosInstance from "@/api/http";
import { CardSkelton, NoRecordFound } from "@/components/common";
import Gallerycard from "@/components/common/Gallerycard";
import { Button } from "@/components/common/index";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Cookies from "js-cookie";
import { selectfilters } from "@/redux/slice/filters";
import { getObjectFromLocalStorage } from "@/utils/storage";
import DetailPopup from "@/components/common/DetailPopup";

const FavorietGalleryView = () => {
  const filterValues = useSelector(selectfilters);

  const [loading, setLoading] = useState(true);
  const [clickedItem, setClickedItem] = useState(null);
  const [pois, setPoi] = useState([]);

  const limit = 1000;

  const user = getObjectFromLocalStorage("user");
  // const u: any = Cookies.default.get("user");
  // let user: any;
  // if (u !== undefined && u !== null) {
  //   try {
  //     user = JSON.parse(u);
  //   } catch (error) {
  //     console.error("Error parsing user JSON:", error);
  //   }
  // }

  const userId = user?._id;

  useEffect(() => {
    fetchFavoritsPois();
  }, [filterValues]);

  const fetchFavoritsPois = () => {
    let queryString = "";
    if (filterValues.length > 0) {
      const simplifiedObject = filterValues.reduce((acc: any, curr: any) => {
        // Check if type already exists in accumulator
        if (acc[curr.type]) {
          // Check if acc[curr.type] is an array
          if (Array.isArray(acc[curr.type])) {
            // Push current value to array
            acc[curr.type].push(curr.value);
          } else {
            // Convert acc[curr.type] to array and push current and existing value
            acc[curr.type] = [acc[curr.type], curr.value];
          }
        } else {
          // Initialize type with value
          acc[curr.type] = curr.value;
        }
        return acc;
      }, {});

      Object.keys(simplifiedObject).forEach((key) => {
        if (Array.isArray(simplifiedObject[key])) {
          simplifiedObject[key] = simplifiedObject[key].slice(1).join(",");
        }
      });

      queryString = [
        simplifiedObject?.rating &&
          `rating=${encodeURIComponent(simplifiedObject.rating)}`,
        simplifiedObject?.city &&
          `city=${encodeURIComponent(simplifiedObject.city)}`,
        simplifiedObject?.country &&
          `country=${encodeURIComponent(simplifiedObject.country)}`,
        simplifiedObject?.sort &&
          `sort=${encodeURIComponent(simplifiedObject.sort)}`,
        simplifiedObject?.type && `type=${simplifiedObject.type}`,
        simplifiedObject?.search &&
          `search=${encodeURIComponent(simplifiedObject.search)}`,
      ]
        .filter(Boolean)
        .join("&");
    }

    try {
      axiosInstance
        .get(`/users/${userId}/favorite-pois?limit=${limit}&${queryString}`)
        .then((resp: any) => {
          if (resp.data) {
            setPoi(resp.data?.data);
            setLoading(false);
          }
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      {clickedItem && (
        <div className="fixed w-[480px] top-[138px]  xs:top-[90px] z-50">
          <div className="h-screen !absolute inset-y-0 left-0 z-50 absolute-div">
            <DetailPopup
              poi={clickedItem}
              onClose={() => setClickedItem(null)}
            />
          </div>
        </div>
      )}
      <div className="flex justify-end items-center gap-4 mb-6">
        <Link href={"/app/galleryview"}>
          <Button className="w-[100px] mb-1">Back</Button>
        </Link>
      </div>
      <div
        className="grid grid-wrapper-gallery gap-4   xs:!grid-cols-2 AtScrollHide  AtScrollHide"
        id="scrollable-group"
      >
        {pois?.length > 0 &&
          pois.map((poi, index) => (
            <span
              onClick={() => setClickedItem(poi)}
              className="cursor-pointer"
            >
              <Gallerycard
                poi={poi}
                fetchFavoritsPois={() => fetchFavoritsPois()}
                setLoading={setLoading}
                favPois={pois}
              />
            </span>
          ))}

        <div
          className="h-full items-center justify-center"
          // ref={loadMoreRef}
        ></div>
      </div>
      {loading && (
        <div
          className="grid grid-wrapper-gallery gap-4 mt-4 AtScrollHide"
          id="scrollable-group"
        >
          {Array(10)
            .fill("")
            .map((item, i) => (
              <span key={i}>
                <CardSkelton />
              </span>
            ))}
        </div>
      )}
      {!loading && pois?.length === 0 && <NoRecordFound />}
    </>
  );
};

export default FavorietGalleryView;
