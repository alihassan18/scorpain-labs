"use client";
import { ImageComponent } from "@/components/common";
import React, { useEffect, useState } from "react";
import Choices from "./component/Choices";
import UserDetail from "./component/UserDetail";
import { useMainStore } from "@/zustand/mainStore";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "@/api/http";
import * as Cookies from "js-cookie";
import { ImSpinner9 } from "react-icons/im";
import { CiEdit } from "react-icons/ci";
import { useGetMeQuery, useUpdateUserByIdMutation } from "@/redux/slice/api";
import Menue from "@/components/common/Icons/Menue";
import BasicModal from "@/components/ui/BasicModal/BasicModal";
import BioSkelton from "@/components/common/Skeltons/BioSkelton";
import BioSkeltonSm from "@/components/common/Skeltons/BioSkeltonSm";

const youAre = [
  { name: "Male", key: "gender", url: "/assets/images/emojies/boy.svg" },
  { name: "Female", key: "gender", url: "/assets/images/emojies/girl.svg" },
  { name: "Other", key: "gender", url: "/assets/images/emojies/other.svg" },
];

const youLikeAre = [
  { name: "Male", key: "gender_pref", url: "/assets/images/emojies/boy.svg" },
  {
    name: "Female",
    key: "gender_pref",
    url: "/assets/images/emojies/girl.svg",
  },
  {
    name: "Other",
    key: "gender_pref",
    url: "/assets/images/emojies/other.svg",
  },
];
const lookingFor = [
  {
    name: "Travel buddies",
    key: "you_are_looking_for",
    url: "/assets/images/emojies/travel.svg",
  },
  {
    name: "Friends",
    key: "you_are_looking_for",
    url: "/assets/images/emojies/friend.svg",
  },
  {
    name: "Poly dating",
    key: "you_are_looking_for",
    url: "/assets/images/emojies/dating.svg",
  },
  {
    name: "Casual dating",
    key: "you_are_looking_for",
    url: "/assets/images/emojies/dating.svg",
  },
  {
    name: "Business partners",
    key: "you_are_looking_for",
    url: "/assets/images/emojies/business.svg",
  },
];
const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showEdit, setShowEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const appStore = useMainStore();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const {
    data: userData,
    isLoading: userIsLoading,
    refetch,
  } = useGetMeQuery({});
  const [text, setText] = useState(userData?.bio || "");

  useEffect(() => {
    if (userData) {
      Cookies.default.set("user", JSON.stringify(userData));
      localStorage.setItem("user", JSON.stringify(userData));

      appStore.setUser(userData);
      setText(userData?.bio);
    }
  }, [userData]);

  const [updateUser, { isLoading: userSaveLoading, error }] =
    useUpdateUserByIdMutation();

  const handleChange = (e: any) => {
    setText(e.target.value);
  };


  const handleSave = async () => {
    setShowEdit(false);
    try {
      const payload = {
        bio: text,
      };
      await updateUser(payload);
      toast.success("Information Updated");
      refetch();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMouseEnter = () => {
    setShowEdit(true);
  };

  const handleMouseLeave = () => {
    setShowEdit(false);
  };

  const userID = userData?._id;

 

  const uploadImage = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "forensic");
    formData.append("cloud_name", "dd0kksnru");

    let url: string = "https://api.cloudinary.com/v1_1/dd0kksnru/upload";

    setImgLoading(true);
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    const res = await updateUser({
      image: data.secure_url,
    });
    refetch();
    setImgLoading(false);
  };

  const bioText = userData?.bio || "Please enter your bio";
  const characterLimit = 100; // Adjust this limit as needed

  const truncatedText =
    bioText.length > characterLimit
      ? `${bioText.substring(0, characterLimit)}`
      : bioText;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="flex lg:flex-row flex-col gap-4 mt-5 ">
      <div className="w-full lg:w-[360px] rounded-larg xs:hidden max-h-[670px]   bg-white p-5 shadow-lg sm:flex-shrink-0">
        {userIsLoading ? (<BioSkelton />):
        (
        <div className="">
          <div className="flex flex-col items-center ">
            <div className="relative rounded-full h-[152px] w-[152px] ">
              {imgLoading ? (
                <div className="items-center top-0 flex justify-center h-full w-full">
                  <ImSpinner9
                    className={"animate-spin text-lg text-[#7557EB]"}
                  />
                </div>
              ) : (
                <ImageComponent
                  src={
                    userData?.image ||
                    "https://res.cloudinary.com/dz7sec6n3/image/upload/v1720796429/user-dummy_rx6reo.jpg"
                  }
                  alt=""
                  className="rounded-full object-cover"
                  figClassName="h-[152px] w-[152px]"
                  fill
                />
              )}

              <label
                htmlFor="profile"
                className="absolute z-10 bottom-2 right-2 cursor-pointer bg-[#3396f1] text-lg text-white rounded-full h-7 w-7 flex justify-center items-center"
              >
                <input
                  type="file"
                  name=""
                  id="profile"
                  className="hidden"
                  accept="image/*"
                  // @ts-ignore
                  onChange={(e) => uploadImage(e?.target?.files[0])}
                />
                <CiEdit className="" />
              </label>
            </div>
            <p className="text-darkBlack font-bold mt-3 text-lg">
              {userData?.username}
            </p>
            {/* <p className="text-xs text-darkBlack/50">
            Spiritual entrepreneur and world traveler.
          </p>
          <p
            onClick={() => {
              setShowEdit(true);
            }}
            className="text-xs text-royalBlue font-bold font-display cursor-pointer"
          >
            (Change your bio)
          </p> */}
            {/* <Link target="blank" href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign-up?ref_code=${userID}`}> */}
            {/* <p
            onClick={handleClick}
            className="text-xs cursor-pointer text-royalBlue font-bold font-display mt-6 border border-black px-4 py-2 hover:underline"
          >
            Copy this profile link
          </p> */}
            {/* </Link> */}
          </div>
          {/* <div className="flex gap-6 mt-4 justify-start">
          <div className="text-center">
            <p className="text-darkBlack font-bold mt-3 text-base">6</p>
            <span className="block text-lightGray text-sm font-normal">
              Trips
            </span>
          </div>
          <div className="text-center">
            <p className="text-darkBlack font-bold mt-3 text-base">1%</p>
            <span className="block text-lightGray text-sm font-normal">
              of the world
            </span>
          </div>
          <div className="text-center">
            <p className="text-darkBlack font-bold mt-3 text-base">1d ago</p>
            <span className="block text-lightGray text-sm font-normal">
              Signed up
            </span>
          </div>
          <div className="text-center">
            <p className="text-darkBlack font-bold mt-3 text-base">recently</p>
            <span className="block text-lightGray text-sm font-normal">
              last seen
            </span>
          </div>
        </div> */}
          {/* <p className="text-lightGray text-sm font-normal mt-5">
          The section below is only visible to you and used to show you match in
          the icon in the top right of an avatar, on the matches page, and when
          browse somebody’s profile. We only show what you’re looking for (like
          travel buddies or a relationship) to other members if you both look
          for the same category and are each others liked gender
        </p> */}

          {isEditing ? (
            <div className="mt-5 ">
              <textarea
                className="focus:shadow-outline w-full h-32 px-2.5 font-medium text-sm placeholder:text-sm block font-display  placeholder:text-[#666666] rounded-lg disabled:!text-secondary bg-[#DADADA]/10 focus:outline-none focus:ring-0 border-[#D0D0D0]/15 focus:border-primary"
                value={text}
                onChange={handleChange}
                autoFocus
                style={{ textAlign: "left", whiteSpace: "pre-line" }}
              />

              <button
                className="inline-flex justify-center items-center font-medium rounded-full disabled:cursor-not-allowed AtBtn  text-white active:text-white/80 px-7 py-2 text-sm"
                onClick={handleSave}
              >
                {loading ? "Loading..." : "Save Bio"}
              </button>
            </div>
          ) : (
            <div
              className="relative flex items-start gap-2 justify-between mt-5"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <p className="text-lightGray text-sm font-normal cursor-pointer">
                {userData?.bio ? userData?.bio : "Please enter your bio"}
              </p>
              <span
                onClick={handleEdit}
                className={` top-1 left-1 text-xl text-red-500 ${
                  showEdit ? "" : ""
                } cursor-pointer`}
              >
                <FaRegEdit />
              </span>
            </div>
          )}
        </div>
        )
        }
        
        <p className="text-darkBlack font-bold mt-3 text-base">You are</p>
        <div className="flex  gap-2.5 mt-2">
          <Choices
            data={youAre}
            value={userData?.gender}
            update={async (value: string) => {
              await updateUser({
                gender: value,
              });
              // toast.success("Information Updated");
              refetch();
            }}
          />
        </div>
        <p className="text-darkBlack font-bold mt-3 text-base">You like</p>
        <div className="flex  gap-2.5 mt-2">
          <Choices
            data={youLikeAre}
            value={userData?.gender_pref}
            update={async (value: string) => {
              await updateUser({
                gender_pref: value,
              });
              // toast.success("Information Updated");
              refetch();
            }}
          />
        </div>
        <p className="text-darkBlack font-bold mt-3 text-base">
          You’re looking for
        </p>
        <div className="flex flex-wrap gap-2.5 xs1:gap-2 mt-2 ">
          <Choices
            data={lookingFor}
            value={userData?.you_are_looking_for}
            update={async (value: string) => {
              await updateUser({
                you_are_looking_for: value,
              });
              // toast.success("Information Updated");
              refetch();
            }}
          />
        </div>
      </div>

      <div className="px-3 sm:px-6 hidden xs:block ">
        {/* <BioSkeltonSm/> */}
        {userIsLoading ? (
          <BioSkeltonSm/>
        ):(<div className=" flex gap-2 items-center">
          <div className="relative rounded-full h-[44px] w-[44px]">
            {imgLoading ? (
              <div className="items-center top-0 flex justify-center h-full w-full">
                <ImSpinner9 className={"animate-spin text-sm text-[#7557EB]"} />
              </div>
            ) : (
              <ImageComponent
                src={
                  userData?.image ||
                  "https://res.cloudinary.com/dz7sec6n3/image/upload/v1720796429/user-dummy_rx6reo.jpg"
                }
                alt=""
                className="rounded-full object-cover flex-shrink-0"
                figClassName="h-[44px] w-[44px]"
                fill
              />
            )}
          </div>
          <div className="w-full">
            <div className=" flex   justify-between items-center">
              <p className="text-darkBlack font-bold  text-sm">
                {userData?.username}
              </p>
              <button
                type="button"
                className="h-5 w-5 rounded-full border border-[#DADADA] flex justify-center cursor-pointer items-center flex-shrink-0"
                onClick={() => setShow(true)}
              >
                <Menue className=" !h-3 !w-3" />
              </button>
            </div>
            {/* <p className="text-lightGray  text-xs font-normal cursor-pointer line-clamp-1">
              {userData?.bio ? userData?.bio : "Please enter your bio"}
            </p> */}
            <p className={`text-lightGray text-xs font-normal cursor-pointer `}>
              {isExpanded ? bioText : truncatedText}
              {bioText.length > characterLimit && (
                <span
                  onClick={handleToggle}
                  className="text-primary text-xs shrink-0 ml-1"
                >
                  {isExpanded ? " Read less" : "Read more"}
                </span>
              )}
            </p>
          </div>
        </div>)}
        
      </div>
      <UserDetail />

      <BasicModal hide={setShow} show={show} className="xs:!block !hidden">
        <div className=" w-full rounded-larg  xs:!block !hidden  bg-white p-5 shadow-lg sm:flex-shrink-0">
          <div className="flex flex-col items-center">
            <div className="relative rounded-full h-[70px] w-[70px]">
              {imgLoading ? (
                <div className="items-center top-0 flex justify-center h-full w-full">
                  <ImSpinner9
                    className={"animate-spin text-lg text-[#7557EB]"}
                  />
                </div>
              ) : (
                <ImageComponent
                  src={
                    userData?.image ||
                    "https://res.cloudinary.com/dz7sec6n3/image/upload/v1720796429/user-dummy_rx6reo.jpg"
                  }
                  alt=""
                  className="rounded-full object-cover"
                  figClassName="h-[70px] w-[70px]"
                  fill
                />
              )}

              <label
                htmlFor="profile"
                className="absolute z-10 bottom-0 right-0 cursor-pointer bg-[#3396f1] text-lg text-white rounded-full h-5 w-5 flex justify-center items-center"
              >
                <input
                  type="file"
                  name=""
                  id="profile"
                  className="hidden"
                  accept="image/*"
                  // @ts-ignore
                  onChange={(e) => uploadImage(e?.target?.files[0])}
                />
                <CiEdit className=" !h-4 !w-4" />
              </label>
            </div>
            <p className="text-darkBlack font-bold mt-3 text-lg">
              {userData?.username}
            </p>
            {/* <p className="text-xs text-darkBlack/50">
            Spiritual entrepreneur and world traveler.
          </p>
          <p
            onClick={() => {
              setShowEdit(true);
            }}
            className="text-xs text-royalBlue font-bold font-display cursor-pointer"
          >
            (Change your bio)
          </p> */}
            {/* <Link target="blank" href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign-up?ref_code=${userID}`}> */}
            {/* <p
            onClick={handleClick}
            className="text-xs cursor-pointer text-royalBlue font-bold font-display mt-6 border border-black px-4 py-2 hover:underline"
          >
            Copy this profile link
          </p> */}
            {/* </Link> */}
          </div>
          {/* <div className="flex gap-6 mt-4 justify-start">
          <div className="text-center">
            <p className="text-darkBlack font-bold mt-3 text-base">6</p>
            <span className="block text-lightGray text-sm font-normal">
              Trips
            </span>
          </div>
          <div className="text-center">
            <p className="text-darkBlack font-bold mt-3 text-base">1%</p>
            <span className="block text-lightGray text-sm font-normal">
              of the world
            </span>
          </div>
          <div className="text-center">
            <p className="text-darkBlack font-bold mt-3 text-base">1d ago</p>
            <span className="block text-lightGray text-sm font-normal">
              Signed up
            </span>
          </div>
          <div className="text-center">
            <p className="text-darkBlack font-bold mt-3 text-base">recently</p>
            <span className="block text-lightGray text-sm font-normal">
              last seen
            </span>
          </div>
        </div> */}
          {/* <p className="text-lightGray text-sm font-normal mt-5">
          The section below is only visible to you and used to show you match in
          the icon in the top right of an avatar, on the matches page, and when
          browse somebody’s profile. We only show what you’re looking for (like
          travel buddies or a relationship) to other members if you both look
          for the same category and are each others liked gender
        </p> */}

          {isEditing ? (
            <div className="mt-5">
              <textarea
                className="focus:shadow-outline w-full h-20 px-2.5 font-medium text-sm placeholder:text-sm block font-display  placeholder:text-[#666666] rounded-lg disabled:!text-secondary bg-[#DADADA]/10 focus:outline-none focus:ring-0 border-[#D0D0D0]/15 focus:border-primary"
                value={text}
                onChange={handleChange}
                autoFocus
                style={{ textAlign: "left", whiteSpace: "pre-line" }}
              />
              <div className=" flex justify-center items-center mt-2">
                <button
                  className="inline-flex justify-center items-center font-medium rounded-full disabled:cursor-not-allowed AtBtn  text-white active:text-white/80 px-7 py-2 text-sm"
                  onClick={handleSave}
                >
                  {loading ? "Loading..." : "Save Bio"}
                </button>
              </div>
            </div>
          ) : (
            <div
              className="relative flex items-start gap-2 justify-between mt-5"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <p className="text-lightGray text-xs font-normal cursor-pointer">
                {userData?.bio ? userData?.bio : "Please enter your bio"}
              </p>
              <span
                onClick={handleEdit}
                className={` top-1 left-1 text-xl text-red-500 ${
                  showEdit ? "" : ""
                } cursor-pointer`}
              >
                <FaRegEdit className="text-sm" />
              </span>
            </div>
          )}

          <p className="text-darkBlack font-bold mt-3 text-base">You are</p>
          <div className="flex  gap-2.5 mt-2">
            <Choices
              data={youAre}
              value={userData?.gender}
              update={async (value: string) => {
                await updateUser({
                  gender: value,
                });
                // toast.success("Information Updated");
                refetch();
              }}
            />
          </div>
          <p className="text-darkBlack font-bold mt-3 text-base">You like</p>
          <div className="flex  gap-2.5 mt-2">
            <Choices
              data={youLikeAre}
              value={userData?.gender_pref}
              update={async (value: string) => {
                await updateUser({
                  gender_pref: value,
                });
                // toast.success("Information Updated");
                refetch();
              }}
            />
          </div>
          <p className="text-darkBlack font-bold mt-3 text-base">
            You’re looking for
          </p>
          <div className="flex flex-wrap gap-2.5 xs1:gap-2 mt-2 ">
            <Choices
              data={lookingFor}
              value={userData?.you_are_looking_for}
              update={async (value: string) => {
                await updateUser({
                  you_are_looking_for: value,
                });
                // toast.success("Information Updated");
                refetch();
              }}
            />
          </div>
        </div>
      </BasicModal>
    </div>
  );
};

export default Profile;
