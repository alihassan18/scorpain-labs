import { ImageComponent } from "@/components/common/index";
import { useGetMeQuery } from "@/redux/slice/api";
import React from "react";
import Link from "next/link";

const ProfileImage = () => {
  const {
    data: userData,
    isLoading: userIsLoading,
    refetch,
  } = useGetMeQuery({});
  return (
    <Link href="/app/profile">
      <div className="border border-[#E2E2E2] px-2 py-2.5 gap-2.5 items-center flex rounded-full">
        <ImageComponent
          src={
            userData?.image ||
            "https://res.cloudinary.com/dz7sec6n3/image/upload/v1720796429/user-dummy_rx6reo.jpg"
          }
          fill
          figClassName="h-6 w-6"
          className="object-cover rounded-full"
          alt=""
        />
        <div className={` text-xs text-[#333333] min-w-20`}>
          {userData?.username}
        </div>
      </div>
    </Link>
  );
};

export default ProfileImage;
