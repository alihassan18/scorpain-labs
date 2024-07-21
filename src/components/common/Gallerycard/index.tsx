"use client";
import React, { useEffect, useState } from "react";
import ImageComponent from "../ImageComponent";
import Stargel from "../Icons/Stargel";
import Link from "next/link";
import Heart from "../Icons/Heart";
import authApi from "@/api/endpoints/auth";
import { toast } from "react-toastify";
import * as Cookies from "js-cookie";
import axios from "axios";
import axiosInstance from "@/api/http";
import { useSelector } from "react-redux";
import { Poi } from "@/types";
import { getObjectFromLocalStorage } from "@/utils/storage";
import { generateCloudinaryImageUrl } from "@/utils/generateCloudinaryImageUrl";
import { addCommasToNumberString, formatRattingNumber } from "@/lib/utils";
interface IProps {
  poi: Poi;
  fetchFavoritsPois?: Function;
  setLoading?: any;
  favPois?: any;
}

const Gallerycard = ({
  poi,
  fetchFavoritsPois,
  setLoading,
  favPois,
}: IProps) => {
  const userData = useSelector((state: any) => state.user.data);
  const [liked, setLiked] = useState(false);
  const user = getObjectFromLocalStorage("user");

  const handleLike = async () => {
    setLiked(!liked);
    const res = await axiosInstance.post("/users/favorite", {userId: user._id,poi: poi._id});
    if(res.data){
      fetchFavoritsPois && fetchFavoritsPois()
    }
  };


  useEffect(() => {
    if (favPois?.find((item: any) => item._id === poi._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [favPois]);
  const transformedImageUrl = poi.images.map((url)=>generateCloudinaryImageUrl(url, 500,500))
  const imageUrl = transformedImageUrl?.length ? transformedImageUrl[0] : "";


  const handleButtonClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    // <Link href={`/app/gallerydetail/${data._id}`}>
    <div className="bg-white  rounded-xl shadow-md ">
      <div className="relative">
        <ImageComponent
          src={imageUrl ? generateCloudinaryImageUrl(imageUrl, 348 * 1.5, 209 * 1.5, 100, true) : "/assets/images/placeholderyolo.svg"}
          alt=""
          className="rounded-t-lg  object-cover"
          figClassName="h-[209px] xs:h-[80px] w-full"
          fill
        />
        <div
          className="w-8 h-8 xs:h-5 xs:w-5 group rounded-full bg-white flex items-center justify-center absolute xs:top-2  xs:right-2 top-3 right-3 "
          onClick={handleButtonClick}
        >
          {!liked && (
            <div onClick={handleLike} className="cursor-pointer">
              <div className="">
                <Heart className="xs:h-4 xs:w-4" />
              </div>
            </div>
          )}
          {liked && (
            <img
              src="/assets/images/gellaryview/heart.svg"
              alt=""
              className="cursor-pointer xs:h-4 xs:w-4"
              onClick={handleLike}
            />
          )}
        </div>
      </div>
      <div className="p-3 space-y-1.5">
        <div className="flex justify-between items-center space-x-3">
          <h1 className="font-bold text-sm max-w-[84%] truncate">
            {poi.title}
          </h1>
          <div className="flex gap-x-2 items-center">
            <i className="icon-fillstar text-[#FFD33C] text-sm"></i>
            <div className="text-sm">{formatRattingNumber(poi.google_rating) ?? "0.0"}</div>
          </div>
        </div>
        <h3 className="text-xs xs1:text-[10px] text-[#878787] font-medium w-full truncate">
          {poi.city},{poi.country}
        </h3>
        <h3 className="text-xs xs1:text-[10px] text-[#878787] font-medium max-w-[10rem] truncate ">
          {poi?.tags &&
            poi.tags.map((tag: string, index: number) => (
              <span>{`${tag}${poi.tags[index + 1] ? "," : ""}`}</span>
            ))}
        </h3>
        <div className=" flex justify-between items-center">
          <h3 className="text-xs xs1:text-[10px] text-[#878787] font-medium ">
            Yolo Score {Number(poi?.yolo_score || 0).toFixed(0)}
          </h3>
          <p className=" text-xs xs1:text-[10px] text-[#007ACE]">
            {poi?.google_reviews ? addCommasToNumberString(poi?.google_reviews) : 0} Reviews
          </p>{" "}
        </div>

        {/* <div className="flex">
            <h3 className="font-bold text-sm text-[#007ACE]">{data.price}</h3>
            <h4 className="font-bold text-sm text-[#878787] "> /night</h4>
          </div> */}
      </div>
    </div>
    // </Link>
  );
};

export default Gallerycard;
