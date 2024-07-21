"use client";
import { Button, ImageComponent } from "@/components/common";
import React, { useEffect, useRef, useState } from "react";
import UserDetail from "../component/UserDetail";
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
import Choices from "../component/Choices";
import { useSearchParams, useParams } from "next/navigation";
import { updateUser } from "@/redux/slice/user";
import { IUser } from "@/interfaces/user.interface";
import FriendDetail from "../component/FriendDetail";
import { FiArrowLeft } from "react-icons/fi";

import { getObjectFromLocalStorage } from "@/utils/storage";
import { WhoCanSendFriendRequest } from "@/app/enum/settings.enum";

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
  const searchParams = useSearchParams();
  const appStore = useMainStore();
  const { id } = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [showEdit, setShowEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSendingRequest, setIsSendingRequest] = useState<boolean>(false);
  const [isRemovingFriend, setIsRemovingFriend] = useState<boolean>(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [fetchedUser, setFetchedUser] = useState<IUser | null>(null);

  const userDetailRef = useRef<any>();

  const user = getObjectFromLocalStorage("user");

  // const u: any = Cookies.default.get("user");
  // let user: any = null;
  // if (u !== undefined && u !== null) {
  //   try {
  //     user = JSON.parse(u);
  //   } catch (error) {
  //     console.error("Error parsing user JSON:", error);
  //   }
  // }

  const fetchUser = async () => {
    try {
      axiosInstance.get(`/users/${id}`).then((resp) => {
        if (resp?.data) {
          setFetchedUser(resp?.data);
          Cookies.default.set("friend", JSON.stringify(resp.data));
        }
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    if (user?.friend_requests_to?.includes(id)) {
      setRequestMessage("Request Sent");
    }
  }, []);

  // const handleEdit = () => {
  //   setIsEditing(true);
  // };

  // const [text, setText] = useState(fetchedUser?.bio || "");

  // useEffect(() => {
  //   if (fetchedUser) {
  //     setText(fetchedUser?.bio);
  //   }
  // }, [fetchedUser]);

  // const [updateUser, { isLoading: userSaveLoading, error }] =
  //   useUpdateUserByIdMutation();

  // const handleChange = (e: any) => {
  //   setText(e.target.value);
  // };

  // const token = Cookies.default.get("access_token");

  // const handleSave = async () => {
  //   setShowEdit(false);
  //   try {
  //     const payload = {
  //       bio: text,
  //     };
  //     await updateUser(payload);
  //     toast.success("Information Updated");
  //     fetchUser();
  //     setIsEditing(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleMouseEnter = () => {
  //   setShowEdit(true);
  // };

  // const handleMouseLeave = () => {
  //   setShowEdit(false);
  // };
  // const handleClick = () => {
  //   const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign-up?ref_code=${userID}`;
  //   navigator.clipboard.writeText(url);
  //   toast.success("Link copied to clipboard!");
  // };

  // const uploadImage = async (file: any) => {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "forensic");
  //   formData.append("cloud_name", "dd0kksnru");

  //   let url: string = "https://api.cloudinary.com/v1_1/dd0kksnru/upload";

  //   setImgLoading(true);
  //   const response = await fetch(url, {
  //     method: "POST",
  //     body: formData,
  //   });

  //   const data = await response.json();

  //   const res = await updateUser({
  //     image: data.secure_url,
  //   });
  //   fetchUser();
  //   setImgLoading(false);
  // };

  const onAddFriend = () => {
    const paylode = {
      userId: user?._id,
      userName: user?.first_name + " " + user?.last_name,
      userImage: user?.image,
      friendId: fetchedUser?._id,
      friendName: fetchedUser?.first_name + " " + fetchedUser?.last_name,
      friendEmail: fetchedUser?.email,
    };
    setIsSendingRequest(true);
    try {
      axiosInstance
        .post(`users/friendRequest/viaEmail`, paylode)
        .then((response) => {
          if (response.data) {
            let existingUserRecord = { ...user };
            existingUserRecord["friend_requests_to"] =
              existingUserRecord?.friend_requests_to?.length > 0
                ? [...existingUserRecord?.friend_requests_to, id]
                : [id];
            Cookies.default.set("user", JSON.stringify(existingUserRecord));
            localStorage.setItem("user", JSON.stringify(existingUserRecord));

            setRequestMessage("Request Sent");
            toast.success(response.data.message);
            setIsSendingRequest(false);
          }
        })
        .catch((error) => {
          toast.error(error.message);
          setIsSendingRequest(false);
        });
    } catch (error) {
      console.log(error, "error receivedd");
    }
  };

  const onRemoveFriend = () => {
    const paylode = {
      friendId: id,
    };

    setIsRemovingFriend(true);

    try {
      axiosInstance
        .put(`/users/${user?._id}/removeFriend`, paylode)
        .then((response) => {
          if (response.data) {
            let existingUserRecord = { ...user };
            existingUserRecord["friends"] = existingUserRecord?.friends.filter(
              (_id: string) => _id !== id
            );
            Cookies.default.set("user", JSON.stringify(existingUserRecord));
            localStorage.setItem("user", JSON.stringify(existingUserRecord));
            setIsRemovingFriend(false);

            if (userDetailRef.current) {
              userDetailRef.current.childFunction();
            }
          }
        });
    } catch (error) {
      setIsRemovingFriend(false);
      console.log(error);
    }
  };

  const bioText = fetchedUser?.bio || "";
  const characterLimit = 100; // Adjust this limit as needed

  const truncatedText =
    bioText.length > characterLimit
      ? `${bioText.substring(0, characterLimit)}...`
      : bioText;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex lg:flex-row flex-col gap-4 mt-5 ">
      <div className="w-full lg:w-[360px] !h-[370px] rounded-larg xs:hidden block bg-white p-5 shadow-lg sm:flex-shrink-0">
        <div className="flex flex-col items-center">
          <div className="relative rounded-full h-[152px] w-[152px]">
            {imgLoading ? (
              <div className="items-center top-0 flex justify-center h-full w-full">
                <ImSpinner9 className={"animate-spin text-lg text-[#7557EB]"} />
              </div>
            ) : (
              <ImageComponent
                src={
                  fetchedUser?.image ||
                  "https://res.cloudinary.com/dz7sec6n3/image/upload/v1720796429/user-dummy_rx6reo.jpg"
                }
                alt=""
                className="rounded-full object-cover"
                figClassName="h-[152px] w-[152px]"
                fill
              />
            )}
            {/* 
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
                // // @ts-ignore
                // onChange={(e) => uploadImage(e?.target?.files[0])}
              />
              <CiEdit className="" />
            </label> */}
          </div>
          <p className="text-darkBlack font-bold mt-3 text-lg">
            {fetchedUser?.username}
          </p>

          {user && user?.friends.includes(id) ? (
            <Button
              onClick={onRemoveFriend}
              className="text-xs bg-blue-400 px-3 py-2 text-white"
              isLoading={isRemovingFriend}
            >
              Remove Friend
            </Button>
          ) : fetchedUser?.settings?.who_send_friend_request ===
            WhoCanSendFriendRequest.NOBODY ? (
            ""
          ) : (
            <Button
              onClick={onAddFriend}
              disabled={requestMessage !== ""}
              isLoading={isSendingRequest}
              className={`text-xs ${
                requestMessage ? "bg-blue-200" : "bg-blue-400"
              } px-3 py-2 text-white`}
            >
              {requestMessage || "Add Friend"}
            </Button>
          )}

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

        <p className="text-lightGray text-sm  text-center font-normal cursor-pointer py-3">
          {fetchedUser?.bio}
        </p>
      </div>

      <div className="px-3 sm:px-6 hidden xs:block">
        <div className=" flex gap-2 items-center">
          <div className="relative rounded-full h-[44px] w-[44px]">
            {imgLoading ? (
              <div className="items-center top-0 flex justify-center h-full w-full">
                <ImSpinner9 className={"animate-spin text-lg text-[#7557EB]"} />
              </div>
            ) : (
              <ImageComponent
                src={
                  fetchedUser?.image ||
                  "https://res.cloudinary.com/dz7sec6n3/image/upload/v1720796429/user-dummy_rx6reo.jpg"
                }
                alt=""
                className="rounded-full object-cover"
                figClassName="h-[44px] w-[44px]"
                fill
              />
            )}
          </div>
          <div className="w-full">
            <div className=" flex justify-between items-center  w-full">
              <p className="text-darkBlack font-bold text-xs">
                {fetchedUser?.username}
              </p>
              <Link href="/app/profile">
                <div className="flex gap-1 items-center">
                  <FiArrowLeft className=" cursor-pointer font-semibold text-base" />
                  <p className="text-primary cursor-pointer font-semibold text-xs">
                    Back
                  </p>
                </div>
              </Link>
            </div>
            <div>
              <p className="text-lightGray text-xs font-normal cursor-pointer">
                {isExpanded ? bioText : truncatedText}
                {bioText.length > characterLimit && (
                  <span
                    onClick={handleToggle}
                    className="text-primary cursor-pointer text-xs shrink-0 ml-1"
                  >
                    {isExpanded ? " Read less" : " Read more"}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className=" flex justify-center items-center mt-2">
          {user && user?.friends.includes(id) ? (
            <Button
              onClick={onRemoveFriend}
              className="text-xs bg-blue-400  w-full  text-white"
              isLoading={isRemovingFriend}
            >
              Remove Friend
            </Button>
          ) : (
            <Button
              onClick={onAddFriend}
              disabled={requestMessage !== ""}
              isLoading={isSendingRequest}
              className={`text-xs  w-full ${
                requestMessage ? "bg-blue-200" : "bg-blue-400"
              }    shrink-0 text-white`}
            >
              {requestMessage || "Add Friend"}
            </Button>
          )}
        </div>
      </div>
      {/* <UserDetail ref={userDetailRef} /> */}
      <FriendDetail ref={userDetailRef} details={fetchedUser} />
    </div>
  );
};

export default Profile;
