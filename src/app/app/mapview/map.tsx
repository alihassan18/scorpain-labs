"use client";

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { MAP_DATA } from "@/utils/constants";

export default function map() {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mapboxgl.accessToken = MAP_DATA.accessToken;
    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: MAP_DATA.theme, // Example style, replace with your preferred style
      center: [-74.5, 40],
      zoom: 11,
    });
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    return () => map.remove();
  }, []);
  return (
    <>
      <div
        ref={mapContainer}
        className="w-[497px] h-[364px] rounded-[30px] border"
      />
    </>
  );
}
