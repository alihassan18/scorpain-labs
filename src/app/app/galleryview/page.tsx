"use client";
import axiosInstance from "@/api/http";
import { CardSkelton, NoRecordFound } from "@/components/common";
import { IFilter } from "@/components/common/GallerySelect";
import Gallerycard from "@/components/common/Gallerycard";
import { Button } from "@/components/common/index";
import { addSort, selectfilters } from "@/redux/slice/filters";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import * as Cookies from "js-cookie";
import Select from "react-select";
import { sortingOptions } from "@/constants";
import DetailPopup from "@/components/common/DetailPopup";

import { getObjectFromLocalStorage } from "@/utils/storage";
import { Poi } from "@/types";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

const GalleryView = () => {
  const dispatch = useDispatch();
  const filterValues = useSelector(selectfilters);
  const [pois, setPois] = useState<Poi[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [favpois, setFavPoi] = useState([]);
  const [selectedValue, setSelectedValue] = useState<any>({
    value: "yolo_score",
    label: "Yolo Score",
    type: "sort",
  });
  const [clickedItem, setClickedItem] = useState(null);
  const limit = 24;

  const observerRef = useIntersectionObserver(() => {
    if (!isLoading && pois.length !== 0 && page <= totalPages) {
      fetchPois(page + 1);
      setPage((prev) => prev + 1);
    }
  });

  async function fetchPois(pageToFetch: number) {
    setIsLoading(true);
    let queryString = "";
    if (filterValues.length > 0) {
      const simplifiedObject = filterValues.reduce((acc: any, curr: any) => {
        // Check if the type property exists in the current object
        if (curr.type) {
          // Create a new property in the accumulator if it doesn't exist
          if (!acc[curr.type]) {
            acc[curr.type] = "";
          }
          // Append the value to the corresponding property in the accumulator
          acc[curr.type] = acc[curr.type]
            ? `${acc[curr.type]},${curr.value}`
            : curr.value;
        }
        return acc;
      }, {});
      console.log('simplifiedObject',simplifiedObject);
      Object.keys(simplifiedObject).forEach((key) => {
        simplifiedObject[key] = simplifiedObject[key].replace(/^,|,$/g, ""); // Remove leading or trailing commas
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
      const response = await axiosInstance.get(
        `/poi?page=${pageToFetch}&limit=${limit}&${queryString}`
      );

      if (response?.data) {
        setTotalPages(response.data?.pagination?.totalPages);
        setIsLoading(false);

        if (pageToFetch === 1) {
          setPois(response.data?.data);
        } else {
          setPois((prev) => [...prev, ...response.data?.data]);
        }
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  const handleSortChange = (selectedOption: IFilter) => {
    dispatch(addSort(selectedOption));
    console.log(selectedOption, "selectedOption");
    // dispatch(updateType(selectedOption));
    setSelectedValue(selectedOption);
  };

  const customStyles = {
    option: (provided: any) => ({
      ...provided,
      // color: "#C7C7C7",
      whiteSpace: "nowrap",
      cursor: "pointer",
    }),
  };

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

  const myFavoritPois = async () => {
    const res = await axiosInstance.get(`/users/${userId}/favorite-pois`);
    if (res.data) setFavPoi(res.data.data);
  };

  useEffect(() => {
    myFavoritPois();
    fetchPois(1);
    setPage(1);
    setPois([]);
  }, [filterValues]);

  useEffect(() => {
    if (clickedItem) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [clickedItem]);

  return (
    <div className="relative ">
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

      <div className="flex  xs:justify-between justify-end md:items-center gap-4 mb-6 mt-2 relative">
        <div className="flex items-center gap-4">
          <p className="text-[#161616] text-sm whitespace-nowrap ">Sort by</p>
          <div className="relative AtProfile w-full">
            <Select
              className="text-xs w-auto sm:w-44 border border-[#E2E2E2]    overflow-hidden  rounded-[35px]  cursor-pointer"
              options={sortingOptions}
              value={selectedValue}
              // @ts-ignore
              onChange={handleSortChange}
              isSearchable={false}
              styles={customStyles}
              placeholder="Sort by"
            />
          </div>
        </div>

        <Link href={"/app/favoritegallery"} className="">
          <Button className="mb-1 whitespace-nowrap xs:!py-2 !h-[40px] xs:text-sm xs:!px-4">
            My Favorites
          </Button>
        </Link>
      </div>

      {pois.length === 0 && !isLoading && <NoRecordFound />}
      <div
        className="grid grid-wrapper-gallery gap-4 xs:!grid-cols-2 AtScrollHide"
        id="scrollable-group"
      >
        {pois.map((item: any, index: number) => (
          <div
            key={`card-index-poi-${index}`}
            onClick={() => setClickedItem(item)}
            className="cursor-pointer"
          >
            <Gallerycard poi={item} key={index} favPois={favpois} />
          </div>
        ))}
        <div
          className="h-full items-center justify-center"
          ref={observerRef}
        ></div>
      </div>
      {isLoading && (
        <div
          className="grid grid-wrapper-gallery gap-4 mt-4 xs:!grid-cols-2 AtScrollHide"
          id="scrollable-group"
        >
          {Array(12)
            .fill("")
            .map((item, i) => (
              <span key={i}>
                <CardSkelton />
              </span>
            ))}
        </div>
      )}
    </div>
  );
};

export default GalleryView;
