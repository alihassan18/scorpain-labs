import React, { useState, useEffect } from "react";
import { Button, ImageComponent } from "@/components/common";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getObjectFromLocalStorage } from "@/utils/storage";
import FriendsSkelton from "../Skeltons/FriendsSkelton";
import axiosInstance from "@/api/http";
import * as Cookies from "js-cookie";
import { toast } from "react-toastify";
import FriendCardComp from "./FriendCardComp";
import { useGetMeQuery } from "@/redux/slice/api";

type Props = {
  buttonText?: string;
  data: any[];
  onClickHandle?: (item: any, setLoading: (loading: boolean) => void) => void;
  isShowButton?: boolean;
  totalFriendsCount: number;
  onLoadMore: () => void;
  isLoadingFriends: boolean;
  onJobComplete: () => void;
};

const UserListWithAction = ({
  buttonText = "Click",
  data = [],
  onClickHandle = () => null,
  isShowButton = true,
  onLoadMore,
  totalFriendsCount,
  isLoadingFriends,
  onJobComplete,
}: Props) => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [loadingMap, setLoadingMap] = useState<{ [key: string]: boolean }>({});
  const [isLoadingMore, setIsLoadingMore] = useState(false); // State for loading more data
  const [isRemovingFriend, setIsRemovingFriend] = useState<boolean>(false);
  const [isSendingRequest, setIsSendingRequest] = useState<boolean>(false);
  const [loadingIds, setLoadingIds] = useState<{ [key: string]: boolean }>({});

  const {data: user} = useGetMeQuery({});
  if(!user) return null;
  const fetchUserState = (id: string) => {
    if(user && user.friend_requests_to.includes(id)) return 1;
    if(user && user.friends.includes(id)) return 2;
    return 0;
  }

  const loadMore = () => {
    setIsLoadingMore(true);
    onLoadMore();
    setIsLoadingMore(false);
  };



  return (
    <>
      {isLoadingFriends && data.length === 0 ? (
        <div className="grid-wrapper-friend grid gap-2 sm:gap-y-2 gap-y-6   items-center">
          <FriendsSkelton />
        </div>
      ) : (
        <div className="    mt-16 space-y-4 px-3 xs:mt-8">
          {data.length === 0 && !isLoadingFriends ? (
            <div className="flex justify-center items-center  h-[45vh]">
              <p className="font-bold capitalize">No friends found !</p>
            </div>
          ) : (
            <div className=" grid-wrapper-friend grid gap-2 sm:gap-y-2 gap-y-8   items-center">
              {data.map((item, i) => (
                <div key={`friend-card${i}`}>
                  <FriendCardComp state={fetchUserState(item._id)} user={user} data={item} updateUser={(userData: any) => {
                    console.log('userData',userData);
                      Cookies.default.set("user", JSON.stringify(userData));
                      localStorage.setItem("user", JSON.stringify(userData));
                      // refresh();
                  }} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* {isShowButton && data.length < totalFriendsCount && (
        <div className="flex justify-center items-center">
          <Button
            onClick={loadMore}
            className="mt-4"
            isLoading={isLoadingMore}
            disabled={isLoadingMore}
          >
            Load More
          </Button>
        </div>
      )} */}
    </>
  );
};

export default UserListWithAction;
