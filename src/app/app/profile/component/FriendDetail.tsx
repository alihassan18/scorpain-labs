"use client";
import { Button, ImageComponent, SearchComponent } from "@/components/common";
import React, { useEffect, useRef, useState } from "react";
import USerTabs from "./UserTabs";
import Select from "react-select";
import mapboxgl from "mapbox-gl";
import PastTrip from "./PastTrip";
import axiosInstance from "@/api/http";
import { toast } from "react-toastify";
import * as Cookies from "js-cookie";
// @ts-ignore
import OutSideClick from "react-outside-click-handler";

import {
  useDeleteTripMutation,
  useUpdateTripMutation,
  useGetTripsQuery,
} from "@/redux/slice/api";
import { ref } from "yup";
import Link from "next/link";
import useDebounce from "@/hooks/useDebounce";
import Friends from "@/components/common/UserlistWithAction";
import { useQuery } from "react-query";
import { useParams, usePathname } from "next/navigation";
import { IUser } from "@/interfaces/user.interface";
import { getObjectFromLocalStorage } from "@/utils/storage";
import { MAP_DATA } from "@/utils/constants";
import createCustomMarkerElement from "@/components/common/CustomMarker";
import { WhoCanSeeLocation, WhoCanSeeTrip } from "@/app/enum/settings.enum";

interface Props {
  ref: React.MutableRefObject<any>;
  details: IUser | null;
}

const fetchFriends = async (userId: string, page: number, limit: number) => {
  const { data } = await axiosInstance.get(`/users/${userId}/friends`);
  if (data?.data) return data.data;
  return [];
};

const FriendDetail = React.forwardRef<any, Props>(({ details }, ref) => {
  const params = useParams();
  const pathname = usePathname();
  const { id } = params;

  const [activeTab, setActiveTab] = useState(0);
  const [pastTrips, setPastTrips] = useState([]);
  const [UpcomingTrips, setUpcomingTrips] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [city, setCity] = useState("");
  const [invite_friends, setInvite_friends] = useState<string | null>("");
  const [loading, setLoading] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<any>();
  const mapContainer = useRef<HTMLDivElement>(null);

  const [isEdit, setIsEdit] = useState(false);
  const [userFriends, setUserFriends] = useState([]);
  const [options, setOptions] = useState<Array<any>>([]);
  const [selectedValue, setSelectedValue] = useState(null);
  // const userDataString = Cookies.default.get("user");
  const [searchFriends, SetSearchFriends] = useState<any>("");
  const [searchResults, setSearchResults] = useState<any>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRemovingFriend, setIsRemovingFriend] = useState<boolean>(false);
  const [isSendingRequest, setIsSendingRequest] = useState<boolean>(false);
  const [friendTrips, setFriendTrips] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [friendsData, setFriendsData] = useState<IUser[]>([]);
  const [totalFriendsCount, setTotalFriendsCount] = useState<number>(0);
  const mapInstance = useRef<mapboxgl.Map | null>(null);

  React.useImperativeHandle(ref, () => ({
    childFunction() {
      // Do something...
      refetchFriends();
    },
  }));

  const user = getObjectFromLocalStorage("user");
  // let user: any;
  // if (userDataString) {
  //   user = JSON.parse(userDataString);
  // }

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const {
    refetch: refetchFriends,
    isLoading: isLoadingFriends,
    isRefetching: isRefetchingFriends,
  } = useQuery(
    ["fetchFriends"],
    () =>
      fetchFriends(pathname === "/app/profile" ? user._id : id, page, limit),
    {
      keepPreviousData: true,
      onSuccess(data) {
        setFriendsData(data);
      },
    }
  );
  useEffect(() => {
    mapboxgl.accessToken = MAP_DATA.accessToken;
    mapInstance.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: MAP_DATA.theme, // Example style, replace with your preferred style
      center: [-74.5, 40],
      zoom: 16,
    });

    mapInstance.current.addControl(
      new mapboxgl.NavigationControl(),
      "bottom-right"
    );

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (
      details?.location?.longitude &&
      mapInstance.current &&
      (details?.settings?.who_see_my_location === WhoCanSeeLocation.EVERYONE ||
        (user?.friends.includes(details?._id) &&
          details?.settings?.who_see_my_location ===
            WhoCanSeeLocation.FRIENDS_ONLY))
    ) {
      mapInstance.current.flyTo({
        center: [details.location.longitude, details.location.latitude],
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });

      loadDataAndAddMarkers(mapInstance.current);
    }
  }, [details, mapInstance.current]);

  const loadDataAndAddMarkers = (map: any) => {
    new mapboxgl.Marker({
      element: createCustomMarkerElement(
        details?.image ??
          "https://res.cloudinary.com/dz7sec6n3/image/upload/v1720796429/user-dummy_rx6reo.jpg"
      ),
    })
      .setLngLat([details?.location.longitude, details?.location.latitude])
      .addTo(map);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      axiosInstance
        .get(`/users/search/${searchTerm}`)
        .then((response: any) => {
          if (response?.data?.data) {
            setSearchResults(response.data?.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setSearchResults([]);
        });
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (searchResults.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [searchResults]);

  useEffect(() => {
    const get_friends = async () => {
      const response = await axiosInstance.get("/me/friends");
      if (response.data) {
        setUserFriends(response.data);
        setTotalFriendsCount(response.data.length);
        const opts =
          response.data?.length > 0
            ? response.data?.map((f: any) => {
                return {
                  value: f._id,
                  label: `${f.first_name} ${f.last_name}`,
                };
              })
            : [];
        setOptions(opts);
      }
    };
    get_friends();
  }, []);
  const clearStates = () => {
    setStartDate("");
    setEndDate("");
    setCity("");
    setInvite_friends(null);
    setIsEdit(false);
    setSelectedValue(null);
  };
  const { isLoading, refetch } = useGetTripsQuery({});
  const [deleteTrip] = useDeleteTripMutation();
  const [updateTrip] = useUpdateTripMutation();

  let tabData = [
    {
      label: `${friendsData?.length || 0}`,
      title: "Friends",
      content: (
        // @ts-ignore

        <Friends
          // @ts-ignore
          data={friendsData}
          onClickHandle={(item: any) => {}}
          isLoadingFriends={isLoadingFriends || isRefetchingFriends}
          isShowButton={true}
          onJobComplete={() => refetchFriends()}
          // onLoadMore={loadMoreFriends}
          totalFriendsCount={friendsData?.length}
        />
      ),
    },
  ];

  const tripTabs = [
    {
      label: `${friendTrips?.pastTrips?.length || 0}`,
      title: "Past trips",
      content: (
        // @ts-ignore
        <PastTrip
          // updateHandler={updateHandler}
          // deleteHandler={deleteHandler}
          trips={friendTrips?.pastTrips || []}
        />
      ),
    },
    {
      label: `${friendTrips?.upcomingTrips?.length || 0}`,
      title: "Upcoming Trips ",
      content: (
        // @ts-ignore
        <PastTrip
          // updateHandler={updateHandler}
          // deleteHandler={deleteHandler}
          trips={friendTrips?.upcomingTrips || []}
        />
      ),
    },
  ];

  if (
    details?.settings.who_see_trip === WhoCanSeeTrip.EVERYONE ||
    (details?.settings.who_see_trip === WhoCanSeeTrip.FRIENDS_ONLY &&
      details?.friends.includes(user._id))
  ) {
    tabData = [...tabData, ...tripTabs];
  }

  const handleSearch = (searchString: string) => {
    setSearchTerm(searchString);
  };

  // const searchUser = user && user?._id === searchResults?.data?._id;
  // console.log(searchUser, "-----");

  useEffect(() => {
    try {
      axiosInstance.get(`/trip/${id}`).then((resp) => {
        setFriendTrips(resp?.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="w-full">
      <div className="bg-white shadow-md xs:shadow-none xs:rounded-none rounded-[26px]">
        <div className="relative">
          <OutSideClick
            onOutsideClick={() => {
              setIsOpen(false);
            }}
          >
            <div className="absolute top-4 left-4 z-30">
              <div onClick={() => setIsOpen(!isOpen)} className="relative">
                <SearchComponent
                  placeholder="Search friend by name"
                  iconStyle="text-lg"
                  className="!rounded-md  w-[280px] xs1:w-[270px]"
                  seValue={SetSearchFriends}
                  setSearchResults={handleSearch}
                />
              </div>

              <div
                className={` ${
                  searchResults.length > 0 ? "block" : "hidden"
                } border border-white outline-none   p-4  top-12   shadow-md rounded-[20px] max-h-[240px] overflow-auto AtScrollHide xs1:w-[270px] w-[280px]  bg-white
               absolute   !z-[99999] ${isOpen ? "block" : "hidden"}
                   `}
              >
                <div className="">
                  {searchResults.length > 0 &&
                    searchResults
                      .filter((x: any) => x._id !== user?._id)
                      .map((item: any) => (
                        <Link href={`/app/profile/${item?._id}`} key={item._id}>
                          <div className="flex items-center gap-2.5 mb-4">
                            <ImageComponent
                              src={
                                item.image ||
                                "https://res.cloudinary.com/dz7sec6n3/image/upload/v1720796429/user-dummy_rx6reo.jpg"
                              }
                              fill
                              figClassName="h-[50px] w-[50px] xs:h-10 xs:w-10 flex-shrink-0"
                              className="w-full object-cover rounded-full"
                            />
                            <div className="">
                              <p className="text-[#001D41] text-base xs:text-sm">
                                {item.first_name + " " + item.last_name}
                              </p>
                              <p className="xs:text-xs text-sm text-[#575757]">
                                {`@${item.username}`}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                </div>
              </div>

              {/* <span className="text-white  text-xs">
                {searchUser
                  ? ""
                  : searchResults?.message?.includes("not found")
                  ? searchResults?.message
                  : ""}
              </span> */}
            </div>
          </OutSideClick>

          <div
            ref={mapContainer}
            className="h-[260px] w-full rounded-larg xs:rounded-none overflow-hidden relative"
          >
            {(details?.settings?.who_see_my_location ===
              WhoCanSeeLocation.FRIENDS_ONLY &&
              !user.friends?.includes(details?._id)) ||
            details?.settings?.who_see_my_location ===
              WhoCanSeeLocation.NOBODY ? (
              <div className=" h-[260px] bg-black/90 flex justify-center items-center  absolute z-20 inset-0">
                <p className="text-center text-white text-base">
                  Location information is unavailable due to privacy settings.
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="px-3 sm:px-6 pb-4">
          <div className="mt-6">
            <USerTabs
              tabs={tabData}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">{tabData[activeTab].content}</div>
    </div>
  );
});
export default FriendDetail;
