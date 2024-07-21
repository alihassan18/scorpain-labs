import axiosInstance from "@/api/http";
import { ImageComponent } from "@/components/common";
import { Add, Delete, Edit } from "@/components/common/Icons";
import moment from "moment";
import React from "react";
import * as Cookies from "js-cookie";
import AvatarGroup from "@atlaskit/avatar-group";
import {
  useDeleteTripMutation,
  useGetTripsQuery,
  useUpdateTripMutation,
} from "@/redux/slice/api";
import { toast } from "react-toastify";
import TripsSkelton from "@/components/common/Skeltons/TripsSkelton";
import FriendsSkelton from "@/components/common/Skeltons/FriendsSkelton";

type Props = {
  updateHandler?: (item: any) => void; // Define the function type
  deleteHandler?: (id: string) => void;
  trips: Array<any>;
  isLoading: any;
};

const PastTrip = ({
  updateHandler,
  deleteHandler,
  trips,
  isLoading,
}: Props) => {
  const transformInviteFriendsData = (invite_friends: any[]) => {
    return invite_friends.map((friend) => ({
      name: friend.username,
      src: friend.image,
      style: {objectCover:"cover" }, 
    }));
  };

  return (
    <>
      <div className="overflow-auto  mt-4">
        {isLoading ? (
          <TripsSkelton />
        ) : (
          <div>
            {trips.length === 0 ? (
              <div className="flex justify-center items-center  h-[45vh]">
                <p className="font-bold capitalize">No Trips found !</p>
              </div>
            ) : (
              <div className="overflow-auto min-w-full bg-[#157DFF]/10 max-h-[calc(100vh-320px)] AtScrollHide">
                <table className="min-w-full ">
                  <thead className="">
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-gray-border-borderColor ">
                    {trips.map((items: any, index) => (
                      <tr key={index} className="py-5">
                        <td className="px-6 py-5 whitespace-nowrap">
                          <p className="text-darkBlack font-bold text-base text-center whitespace-nowrap">
                            {moment(items.startDate).format("MM/DD/YYYY")}
                          </p>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <p className="text-darkBlack font-bold text-base text-center">
                            {moment(items.endDate).format("MM/DD/YYYY")}
                          </p>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center justify-center">
                            <p className="text-darkBlack font-bold text-base">
                              {items.country}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <p className="text-darkBlack font-bold text-base text-center whitespace-nowrap">
                            {items.city}
                          </p>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex justify-end items-center gap-2 whitespace-nowrap">
                            <div
                              className={`cursor-pointer ${
                                items.username
                                  ? "absolute -top-5 group-hover:flex group-hover:visible invisible items-center gap-2.5 z-10"
                                  : "visible relative flex items-center gap-2"
                              }`}
                            >
                              <AvatarGroup
                                appearance="stack"
                                data={transformInviteFriendsData(
                                  items.invite_friends
                                )}
                                maxCount={3}
                                size="medium"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {updateHandler && (
                              <div
                                onClick={() => updateHandler(items)}
                                className="bg-white p-1 rounded-md shadow-sm cursor-pointer"
                              >
                                <Edit />
                              </div>
                            )}
                            {deleteHandler && (
                              <div
                                onClick={() => deleteHandler(items._id)}
                                className="bg-white p-1 rounded-md shadow-sm cursor-pointer"
                              >
                                <Delete />
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default PastTrip;
