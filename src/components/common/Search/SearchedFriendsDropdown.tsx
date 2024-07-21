import React, { useEffect, useState } from "react";
import ImageComponent from "../ImageComponent";
import Button from "../Button";
import axiosInstance from "@/api/http";
import { useDispatch, useSelector } from "react-redux";
import { selectfilters } from "@/redux/slice/filters";
import { getObjectFromLocalStorage } from "@/utils/storage";
import { IUser } from "@/interfaces/user.interface";
import { updateFriendOnMap } from "@/redux/slice/user";
import Loader from "../Loader";
import { userDummyImage } from "@/constants";
import { WhoCanSeeLocation } from "@/app/enum/settings.enum";

function SearchedFriendsDropdown() {
  const filterValues = useSelector(selectfilters);
  const dispatch = useDispatch();
  const [searchedFriends, setSearchedFriends] = useState([]);

  const user = getObjectFromLocalStorage("user");

  useEffect(() => {
    const searchTerm =
      filterValues.find((x: any) => x.type === "search")?.value || "";
    searchFriends(searchTerm);
  }, [filterValues]);

  const searchFriends = async (search: string) => {
    try {
      const response = await axiosInstance.get(
        `users/${user?._id}/friends?search=${search}`
      );
      if (response?.data?.data) {
        const filteredFriends = response?.data?.data.filter(
          (x: IUser) =>
            x.settings?.who_see_my_location !== WhoCanSeeLocation.NOBODY
        );
        setSearchedFriends(response?.data?.data);
      }
    } catch (error) {
      console.log(error, "Error while searching friends");
    }
  };

  return (
    <div>
      {searchedFriends.length > 0 &&
        searchedFriends.map((item: IUser, i) => (
          <div className=" flex justify-between items-center mb-6">
            <div className=" flex gap-5 items-center">
              <ImageComponent
                src={item.image || userDummyImage}
                alt=""
                className="rounded-full object-cover"
                figClassName="h-[30px] w-[30px]"
                fill
              />
              <p className="text-[#161616]  max-w-[12rem] xs:max-w-[6rem] xs1:max-w-[5rem] truncate sm:text-base text-xs">
                {item.first_name} {item.last_name}
              </p>
            </div>
            <Button
              className="text-xs bg-blue-400 xs1:!px-3.5  text-white"
              onClick={() => dispatch(updateFriendOnMap(item))}
              disabled={
                item?.location?.latitude &&
                item.settings?.who_see_my_location !== WhoCanSeeLocation.NOBODY
                  ? false
                  : true
              }
            >
              See Location
            </Button>
          </div>
        ))}
      {searchedFriends.length === 0 && (
        <div className=" flex justify-center items-center h-[100px]">
          {" "}
          <p className="text-xl font-semibold">No Friends Found !</p>
        </div>
      )}
    </div>
  );
}

export default SearchedFriendsDropdown;
