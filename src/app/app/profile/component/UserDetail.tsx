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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
import { IUser, LocationType } from "@/interfaces/user.interface";
import { cities } from "@/components/common/GallerySelect/flters";
import Calendar from "@/components/common/Icons/Calendar";
import { getObjectFromLocalStorage } from "@/utils/storage";
import { GEO_LOCATION_STATE, MAP_DATA } from "@/utils/constants";
import FriendsDropdown from "./FriendsDropdown";
import createCustomMarkerElement from "@/components/common/CustomMarker";
import { CiLocationArrow1 } from "react-icons/ci";
import moment from "moment";
import { tree } from "next/dist/build/templates/app-page";
import Input from "@/components/common/Forms/Input";
// import SelectSearch from "./SelectSearch";

const fetchFriends = async (userId: string, page: number, limit: number) => {
  const { data } = await axiosInstance.get(
    `/users/${userId}/friends?limit=${limit}&page=${page}`
  );
  if (data?.data) return data.data;
  return [];
};

const UserDetail = React.forwardRef((props, ref) => {
  const params = useParams();
  const pathname = usePathname();
  const { id } = params;
  const mapInstance = useRef<mapboxgl.Map | null>(null);

  const [activeTab, setActiveTab] = useState(0);
  const [pastTrips, setPastTrips] = useState([]);
  const [UpcomingTrips, setUpcomingTrips] = useState([]);
  const [startDate, setStartDate] = useState<undefined | Date>(undefined);
  const [endDate, setEndDate] = useState<undefined | Date>(undefined);
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [cityText, setCityText] = useState<string>("");
  const [invite_friends, setInvite_friends] = useState<string | null>("");
  const [loading, setLoading] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<any>({ invite_friends: [] });
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
  const [checkedFriends, setCheckedFriends] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [allFriends, setAllFriends] = useState<any[]>([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [totalFriendsCount, setTotalFriendsCount] = useState<number>(0);
  const [friendsData, setFriendsData] = useState<IUser[]>([]);
  const [markerUserAdded, setMarkerUserAdded] = useState(false);
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
        let existingUserRecord = { ...user };
        existingUserRecord["friend_requests_to"] =
          existingUserRecord?.friend_requests_to.filter(
            (x: string) => !data.includes(x)
          );
        Cookies.default.set("user", JSON.stringify(existingUserRecord));
        localStorage.setItem("user", JSON.stringify(existingUserRecord));
        setAllFriends((prev) => [...prev, ...data]);
        setHasMoreData(totalFriendsCount >= limit);
        setFriendsData(data);
      },
    }
  );

  useEffect(() => {
    if(mapInstance.current){
      loadDataAndAddMarkers(mapInstance.current, user?.image);

    }
  },[user, mapInstance.current])

  useEffect(() => {
    mapboxgl.accessToken = MAP_DATA.accessToken;
    mapInstance.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: MAP_DATA.theme, // Example style, replace with your preferred style
      center: [-74.5, 40],
      zoom: 11,
    });

    mapInstance.current.on("load", () => {
      if (user.location.longitude) {
        mapInstance.current && mapInstance.current.flyTo({
          center: [user.location.longitude, user.location.latitude],
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
          zoom: 16,
        });

        loadDataAndAddMarkers(mapInstance.current, user?.image);
        setMarkerUserAdded(true);
      }
    });
    mapInstance.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    return () => {
      mapInstance.current && mapInstance.current.remove();
    }
  }, []);

  const loadDataAndAddMarkers = (map: any, userImage?: string) => {
    new mapboxgl.Marker({
      element: createCustomMarkerElement(userImage ?? 'https://res.cloudinary.com/dz7sec6n3/image/upload/v1720796429/user-dummy_rx6reo.jpg'),
    })
      .setLngLat([user.location.longitude, user.location.latitude])
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

  const resetCheckedFriends = () => {
    setCheckedFriends([]);
  };

  const handleInvite_friends = (friends: any) => {
    setInvite_friends(friends);
    setSelectedValue(friends);
  };
  const onAddTrip = async () => {
    if (!startDate || !endDate) return;
  
    const data = {
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      invite_friends: invite_friends ? invite_friends : [],
      city: cityText,
    };
  
    try {
      setLoading(true);
      const response = await axiosInstance.post("/trip", data);
      if (response.data) {
        toast.success("Trip added successfully");
        clearStates();
        refetch();
        if (moment(data.endDate).isBefore(moment())) {
          setActiveTab(1);
        } else {
          setActiveTab(2);
        }
        resetCheckedFriends();
      }
      console.log(response.data.pastTrips,"lasjdjwejfdeoj");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const clearStates = () => {
    // @ts-ignore
    setStartDate("");
    // @ts-ignore
    setEndDate("");
    setCity("");
    setCityText("");
    setSelectedCity(null);
    setInvite_friends(null);
    setIsEdit(false);
    setSelectedValue(null);
  };

  const updateHandler = (data: any) => {
    setIsEdit(true);
    setSelectedTrip(data);

    // @ts-ignore
    setStartDate(new Date(data.startDate));
    // @ts-ignore
    setEndDate(new Date(data.endDate));
    setCity(data.city);
    setCityText(data.city);
    setInvite_friends(data.invite_friends[0]?._id || "");
    setSelectedValue(data.invite_friends[0]?._id);
  };
  const { data: trip, isLoading, error, refetch } = useGetTripsQuery({});
  const [deleteTrip, { isLoading: deleteLoading, error: deleteError }] =
    useDeleteTripMutation();
  const [updateTrip, { isLoading: updateLoading, error: updateError }] =
    useUpdateTripMutation();
  const deleteHandler = async (id: string) => {
    await deleteTrip(id);
    refetch();
    clearStates();
    toast.success("Trip delete succcessfully");
  };
  const onEditTrip = async () => {
    const data = {
      startDate: startDate,
      endDate: endDate,
      invite_friends: checkedFriends ? checkedFriends : [],
      city: cityText,
    };

    await updateTrip({
      id: selectedTrip._id,
      data,
    });
    refetch();
    resetCheckedFriends();
    clearStates();
    toast.success("Trip Edit successfully");
  };

  // const loadMoreFriends = () => {
  //   setPage((prev) => prev + 1);
  //   refetchFriends();
  // };

  const tabData = [
    {
      label: `${friendsData?.length || 0}`,
      title: "Friends",
      content: (
        // @ts-ignore
        <Friends
          data={friendsData}
          onClickHandle={(item: any) => {}}
          buttonText="Add More"
          isLoadingFriends={isLoadingFriends || isRefetchingFriends}
          isShowButton={true}
          onJobComplete={() => refetchFriends()}
          totalFriendsCount={totalFriendsCount}
          // onLoadMore={loadMoreFriends}
        />
      ),
    },
    {
      label: `${trip?.pastTrips?.length || 0}`,
      title: "Past trips",
      content: (
        // @ts-ignore
        <PastTrip
          updateHandler={updateHandler}
          deleteHandler={deleteHandler}
          trips={trip?.pastTrips || []}
          isLoading={isLoading}
        />
      ),
    },
    {
      label: `${trip?.upcomingTrips?.length || 0}`,
      title: "Upcoming Trips ",
      content: (
        // @ts-ignore
        <PastTrip
          updateHandler={updateHandler}
          deleteHandler={deleteHandler}
          trips={trip?.upcomingTrips || []}
          isLoading={isLoading}
        />
      ),
    },
  ];
  const customStyles = {
    option: (provided: any) => ({
      ...provided,
      color: "#000000",
      whiteSpace: "nowrap",
      padding: "8px 5px",
      background: "white",
    }),
  };
  const handleStartDateChange = (e: any) => {
    setStartDate(e);
    // @ts-ignore
    setEndDate("");
  };
  const handleEndDateChange = (e: any) => {
    // @ts-ignore
    if (startDate && new Date(e) < new Date(startDate)) {
      setEndDate(startDate);
    } else {
      setEndDate(e);
    }
  };
  const handleSearch = (searchString: string) => {
    setSearchTerm(searchString);
  };

  const handleCityChange = (selectedOption: {
    value: string;
    label: string;
  }) => {
    setCity(selectedOption.value);
    setSelectedCity(selectedOption);
  };

  useEffect(() => {
    if (selectedTrip && selectedTrip.invite_friends) {
      // Check if selectedTrip and selectedTrip.invite_friends are defined
      const inviteFriendIds = selectedTrip.invite_friends.map(
        (friend: any) => friend._id
      );
      setCheckedFriends(inviteFriendIds);
      setSelectedCity({ value: city, label: city });
    }
  }, [selectedTrip]);

  // const searchUser = user && user?._id === searchResults?.data?._id;
  // console.log(searchUser, "-----");
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }


  const handleGeoLocationPermissions = () => {
    console.log('handleGeoLocationPermissions',handleGeoLocationPermissions);
    if ("geolocation" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        console.log('result.state',result.state);
        if (result.state === GEO_LOCATION_STATE.GRANTED) {
          getCurrentLocation();
        } else if (result.state === GEO_LOCATION_STATE.PROMPT) {
          getCurrentLocation();
        } else if (result.state === GEO_LOCATION_STATE.DENIED) {
          toast.error("Location access denied.");
        }

        result.onchange = () => {
          if (result.state === GEO_LOCATION_STATE.GRANTED) {
            getCurrentLocation();
          } else {
          }
        };
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  }

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        updateUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        toast.error(error.message);
      }
    );
  };

  const updateUserLocation = async (location: LocationType) => {
    try {
      const payload = {
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      };
      await axiosInstance.put(`users/${user?._id}`, payload);
      let existingUserRecord = { ...user };
      existingUserRecord["location"] = payload.location;
      Cookies.default.set("user", JSON.stringify(existingUserRecord));
      localStorage.setItem("user", JSON.stringify(existingUserRecord));
      console.log('i called here' , payload.location);
      
      mapInstance.current && mapInstance.current.flyTo({
        center: [payload.location.longitude, payload.location.latitude],
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        zoom: 16,
      });
      
      (markerUserAdded && mapInstance.current) && new mapboxgl.Marker({
        element: createCustomMarkerElement(user?.image ?? 'https://res.cloudinary.com/dz7sec6n3/image/upload/v1720796429/user-dummy_rx6reo.jpg'),
      })
        .setLngLat([payload.location.longitude, payload.location.latitude])
        .addTo(mapInstance.current);
      /* loadDataAndAddMarkers(mapInstance.current); */
    } catch (error) {
      console.log("Error while updaing user", error);
      toast.error("Error while updating location");
    }
  };

  return (
    <div className="w-full">
      {/* <div
        className={` ${
          isOpen && "bg-black/50   fixed top-20 z-50 w-full inset-0"
        } `}
      ></div> */}
      <div className="bg-white shadow-md rounded-[26px] xs:shadow-none xs:rounded-none">
        <div className="relative">
          <OutSideClick
            onOutsideClick={() => {
              setIsOpen(false);
            }}
          >
            <div className="absolute top-4 left-4 z-30">
              <div onClick={() => setIsOpen(!isOpen)} className="relative ">
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
                  {searchResults
                    .filter((x: any) => x._id !== user?._id)
                    .map((item: any, index: number) => (
                      <Link href={`/app/profile/${item?._id}`} key={item._id}>
                        <div className="flex items-center gap-2.5 mb-4">
                          <ImageComponent
                            src={item.image || "/assets/images/placeholder.png"}
                            fill
                            figClassName="h-[50PX] w-[50px] xs:h-10 xs:w-10 flex-shrink-0"
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
            </div>
          </OutSideClick>
          <div
            ref={mapContainer}
            className="h-[260px] w-full rounded-larg xs:rounded-none overflow-hidden relative"
          >
            <div onClick={handleGeoLocationPermissions} className="  absolute right-2 z-10 h-8 w-8  flex justify-center items-center cursor-pointer bg-white  border-2 border-borderColor rounded-full sm2:bottom-40  bottom-32">
              <CiLocationArrow1 className="text-base" />
            </div>
          </div>
        </div>
        <div className="px-3 sm:px-6 py-4">
          <div className="flex xl:items-center gap-3 xs:gap-0 xl:flex-row flex-col md:flex-row lg:flex-col flex-wrap">
            <div className="flex items-center gap-x-2.5  ">
              <div className="flex   items-center gap-2.5  xs:w-full  ">
                <div className=" relative  w-[150px] xs:w-1/2 mt-2    ">
                  <DatePicker
                    // @ts-ignore
                    selected={startDate}
                    // onChange={handleStartDateChange}
                    // @ts-ignore
                    onChange={(date: any) => handleStartDateChange(date)}
                    className="focus:shadow-outline px-2.5 h-[44px]  xs:h-[40px] font-medium relative xs:placeholder:text-xs z-10 xs:text-xs  w-full text-sm !py-3 placeholder:text-sm block font-display cursor-pointer placeholder:text-[#666666] rounded-lg disabled:!text-secondary bg-[#DADADA]/10 focus:outline-none focus:ring-0 border-[#D0D0D0]/15 focus:border-primary"
                    placeholderText="mm/dd/yyy"
                    popperPlacement="top-end"
                  />
                  <div className=" absolute right-2 top-5 ">
                    <Calendar />
                  </div>
                </div>
                <p className="text-[#666666] text-xl xs:hidden flex-shrink-0">
                  -
                </p>

                <div className=" relative  w-[150px] xs:w-1/2  mt-2  ">
                  <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    className="focus:shadow-outline px-2.5  h-[44px]  xs:h-[40px] xs:text-xs xs:placeholder:text-xs font-medium relative z-10  w-full text-sm !py-3 placeholder:text-sm block font-display cursor-pointer placeholder:text-[#666666] rounded-lg disabled:!text-secondary bg-[#DADADA]/10 focus:outline-none focus:ring-0 border-[#D0D0D0]/15 focus:border-primary"
                    placeholderText="mm/dd/yyyy"
                    minDate={startDate} // This disables all dates before the selected start date
                    startDate={startDate}
                    endDate={endDate}
                    showDisabledMonthNavigation
                    popperPlacement="top-end"
                  />
                  <div className=" absolute right-2 top-5 ">
                    <Calendar />
                  </div>
                </div>
                {/* <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  className="focus:shadow-outline px-2.5 font-medium text-sm py-3 placeholder:text-sm block font-display cursor-pointer placeholder:text-[#666666] rounded-lg disabled:!text-secondary bg-[#DADADA]/10 focus:outline-none focus:ring-0 border-[#D0D0D0]/15 focus:border-primary"
                  value={startDate}
                  onChange={handleStartDateChange}
                /> */}
                {/* <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  min={startDate}
                  value={endDate}
                  onChange={handleEndDateChange}
                  className="focus:shadow-outline px-2.5 font-medium text-sm py-3 placeholder:text-sm block font-display cursor-pointer placeholder:text-[#666666] rounded-lg disabled:!text-secondary bg-[#DADADA]/10 focus:outline-none focus:ring-0 text-black border-[#D0D0D0]/15 focus:border-primary"
                /> */}
              </div>
            </div>
            <div className="flex items-center gap-2.5 mt-1 xs:mt-0   flex-wrap xs:flex-nowrap xl:flex-nowrap">
              {/* <input
                type="text"
                name=""
                placeholder="Type a city.."
                id=""
                value={city}
                // onChange={handleCity}
                onChange={(e) => setCity(e.target.value)}
                className="focus:shadow-outline px-2.5 text-sm py-3 placeholder:text-sm block font-medium xs:w-full w-[150px] lg:w-[200px] font-display placeholder:text-[#666666] rounded-lg disabled:!text-secondary bg-[#DADADA]/10 focus:outline-none focus:ring-0 border-[#D0D0D0]/15 focus:border-primary"
              />  */}

              <div className="relative AtProfile xs:w-[32%] mt-1.5 ">
                {/* <Select
                  placeholder="Select"
                  className="text-xs xs:placeholder:text-[10px] py-[2px] 2xl:w-44 w-36 xs1:!text-[10px] mt-1 h-[44px] xs:w-full  border border-gray-300 rounded-md"
                  options={cities}
                  value={selectedCity?.value == "" ? "" : selectedCity}
                  onChange={(selectedOption) =>
                    handleCityChange(
                      selectedOption as { value: string; label: string }
                    )
                  }
                  styles={customStyles}
                /> */}
                <Input 
                  name={"city"}
                  value={cityText}
                  onChange={(e) => {
                    setCityText(e.target.value);
                  }}
                  placeholder="Type your city"
                  style={{
                    padding: '8px',
                    background: '#fbfbfb',
                    maxWidth: '185px',
                    border: '1px solid #cccccc',
                    marginTop: '3px',
                    fontWeight:500
                  }}
                />
                
              </div>
              <div className="relative AtProfile xs1:!w-[33%] mt-1   ">
                {/* <FriendsDropdown
                  options={options}
                  updateInviteFriends={handleInvite_friends}
                  checkedFriends={checkedFriends}
                  setCheckedFriends={setCheckedFriends}
                  initialCheckedFriends={
                    selectedTrip.invite_friends
                      ? selectedTrip.invite_friends.map(
                          (friend: any) => friend._id
                        )
                      : []
                  }
                /> */}
                {/* <Select
                  className="text-xs xs:text-[10px]  2xl:w-44 w-36 xs:w-full   xs:tex border border-gray-300 rounded-md"
                  options={options}
                  value={selectedValue}
                  onChange={handleInvite_friends}
                  styles={customStyles}
                /> */}
                {/* <SelectSearch
                data={options}
                setSelected={setSelected}
                selected={selected}
                // returnFn={yourReturnFunction}
                // handleRemove={yourHandleRemoveFunction}
/> */}
              </div>
              {isEdit ? (
                <Button
                  onClick={onEditTrip}
                  className="!rounded-md mt-2.5 xs:1text-xs xs:!w-[32%] !h-[44px]  xs1:!text-[10px] "
                  disabled={!startDate || !endDate || !cityText}
                >
                  {loading ? "Loading.." : "Edit"}
                </Button>
              ) : (
                <Button
                  onClick={onAddTrip}
                  className="!rounded-md  mt-2.5 xs:1text-xs xs:!w-[32%] !h-[44px]  xs1:!text-[10px] "
                  disabled={!startDate || !endDate || !cityText}
                >
                  {loading ? "Loading.." : "Add trip"}
                </Button>
              )}
            </div>
          </div>
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
export default UserDetail;
