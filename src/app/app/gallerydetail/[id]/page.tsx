"use client";
import React, { useEffect, useState } from "react";
import GalleryDetailPage from "../components/GalleryDetailPage";

const GalleryDetail = () => {
  const [id, setId] = useState("");

  useEffect(() => {
    const pathname = window.location.pathname;

    const segments = pathname.split("/");
    const lastSegment = segments[segments.length - 1];
    setId(lastSegment);
  }, [window.location.pathname]);

  return <GalleryDetailPage id={id} />;
};

export default GalleryDetail;
