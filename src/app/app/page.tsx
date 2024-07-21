"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import axiosInstance from "@/api/http";
import { useSelector } from "react-redux";
import { selectfilters } from "@/redux/slice/filters";
import ClusterListPopUp from "@/components/common/ClustersListPopUp";
import DetailPopup from "@/components/common/DetailPopup";
import { Poi } from "@/types";
import { Loader } from "@/components/common";
import { useQuery } from "react-query";
import { MAP_DATA } from "@/utils/constants";
import createCustomMarkerElement from "@/components/common/CustomMarker";
import { poiPopupHTML } from "@/components/common/MapPopupHTML";
import { getObjectFromLocalStorage } from "@/utils/storage";
import useDebounce from "@/hooks/useDebounce";
import { generateCloudinaryImageUrl } from "@/utils/generateCloudinaryImageUrl";

const fetchPois = async (
  filterValues: any,
  ne: mapboxgl.LngLat | null,
  sw: mapboxgl.LngLat | null
) => {
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
      simplifiedObject?.type &&
        `type=${encodeURIComponent(simplifiedObject.type)}`,
      simplifiedObject?.search &&
        `search=${encodeURIComponent(simplifiedObject.search)}`,
    ]
      .filter(Boolean)
      .join("&");
  }
  const { data } = await axiosInstance.get(
    `/poi/markers?ne=${ne?.lat},${ne?.lng}&sw=${sw?.lat},${sw?.lng}&${queryString}`
  );

  return data;
};

const DashBoard = () => {
  

  return (
    <>
      <div
        className=""
      >
        <h1>I am here</h1>
      </div>
    </> 
  );
};

export default DashBoard;
