"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/api/http";
import { Loader } from "@/components/common";
import { Button, Container, ImageComponent } from "@/components/common/index";
import Link from "next/link";
import AOS from "aos";
import { IUser } from "@/interfaces/user.interface";
import { userDummyImage } from "@/constants";
import FramerMotion from "@/components/ui/FarmerMotion/index";
import * as Cookies from "js-cookie";

function page() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const friendId = searchParams.get("friendId");
  const access_token = Cookies.default.get("access_token");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [friendData, setFriendData] = useState<IUser | null>(null);

  useEffect(() => {
    if (userId && friendId) {
      // addFriend(userId, friendId);
      fetchUserWithId();
      addFriend(userId, friendId);
    }
  }, []);

  async function fetchUserWithId() {
    const [result1, result2] = await Promise.all([
      axiosInstance.get<any>(`/users/${userId}`),
      axiosInstance.get<any>(`/users/${friendId}`),
    ]);

    if (result1.data && result2.data) {
      setUserData(result1.data);
      setFriendData(result2.data);
    }
  }

  const addFriend = async (user_Id: string, friend_Id: string) => {
    const payload = {
      friendId: friend_Id,
    };

    try {
      await axiosInstance.put(`/users/${user_Id}/addFriend`, payload);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      // offset: 200,
      easing: "ease-in-out",
    });
    window.scrollY;
  }, []);

  return (
    <div className="py-[9rem]">
      {isLoading && <Loader />}
      {!isLoading && (
        <Container>
          <div className="sm:w-[600px] mx-auto  top-1/2  relative">
            <FramerMotion />
            <div className="flex  gap-x-3 items-center justify-center">
              <div className="w-[146px]" data-aos="fade-right">
                <ImageComponent
                  src={userData?.image || userDummyImage}
                  alt="img"
                  className="rounded-full object-cover"
                  figClassName="h-[146px] xs:h-[120px] w-[146px] xs:w-[120px]"
                  fill
                />
                <p className="text-[#333333] text-center font-medium mt-2 md:text-[30px] text-2xl xs:text-xl">
                  {userData?.first_name + " " + userData?.last_name}
                </p>
              </div>
              <img src="/assets/images/symbols.svg" data-aos="fade-up" />
              <div className="w-[146px]" data-aos="fade-left">
                <ImageComponent
                  src={friendData?.image || userDummyImage}
                  alt="img"
                  className="rounded-full object-cover"
                  figClassName="h-[146px] xs:h-[120px] w-[146px] xs:w-[120px]"
                  fill
                />
                <p className="text-[#333333] text-center font-medium mt-2 md:text-[30px] text-2xl xs:text-xl">
                  {friendData?.first_name + " " + friendData?.last_name}
                </p>
              </div>
            </div>
            <div data-aos="fade-up">
              <h1 className="text-[#68BDEE] font-medium lg:my-8 my-4 text-center lg:text-[2.625rem] text-3xl xs:text-2xl">
                Congratulations!
              </h1>
              <p className="text-[#1B1A1A]  text-base xs:text-sm text-center">
                You are both connected as friends. Stay connected with Yolo
                Selection’s Friends Map! See friends’ locations, plan meetups,
                and find hidden gems with personalized recommendations.
              </p>
              <div className=" flex justify-center items-center">
                <Link href={!access_token ? '/auth/login' : '/app/galleryview'}>
                  <Button className="w-[341px] mt-12 xs:mt-6 !text-xl !font-bold !py-3.5 ">
                    GO TO DASHBOARD
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}

export default page;
