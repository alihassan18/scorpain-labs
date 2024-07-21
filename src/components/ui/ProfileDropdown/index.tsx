import clsx from "clsx";
import React, {
  Fragment,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { ImageComponent } from "@/components/common";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useGetMeQuery } from "@/redux/slice/api";
// @ts-ignore
import OutSideClick from "react-outside-click-handler";
import { SwitchComponent } from "@/components/common/index";
import BasicModal from "../BasicModal/BasicModal";
import axiosInstance from "@/api/http";
import { getObjectFromLocalStorage } from "@/utils/storage";
import {
  WhoCanSeeLocation,
  WhoCanSeeTrip,
  WhoCanSendFriendRequest,
} from "@/app/enum/settings.enum";
import { debounce } from "@/lib/helper";
import { IUser } from "@/interfaces/user.interface";

interface Iprops {
  home?: boolean;
}

type LocationSettings = {
  everyone: boolean;
  friends_only: boolean;
  nobody: boolean;
};

type FriendRequestSettings = {
  everyone: boolean;
  nobody: boolean;
};

const ProfileDropdown = ({ home }: Iprops) => {
  const user: IUser | null = getObjectFromLocalStorage("user");

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [whoSeeMyLocation, setWhoSeeMyLocation] = useState<LocationSettings>({
    everyone:
      user?.settings?.who_see_my_location === WhoCanSeeLocation.EVERYONE,
    friends_only:
      user?.settings?.who_see_my_location === WhoCanSeeLocation.FRIENDS_ONLY,
    nobody: user?.settings?.who_see_my_location === WhoCanSeeLocation.NOBODY,
  });

  const [whoSeeMyTrip, setWhoSeeMyTrip] = useState({
    everyone: user?.settings?.who_see_trip === WhoCanSeeTrip.EVERYONE,
    friends_only: user?.settings?.who_see_trip === WhoCanSeeTrip.FRIENDS_ONLY,
    nobody: user?.settings?.who_see_trip === WhoCanSeeTrip.NOBODY,
  });

  const [whoSendFriendRequest, setWhoSeeSendFriendRequest] =
    useState<FriendRequestSettings>({
      everyone:
        user?.settings?.who_send_friend_request ===
        WhoCanSendFriendRequest.EVERYONE,
      nobody:
        user?.settings?.who_send_friend_request ===
        WhoCanSendFriendRequest.NOBODY,
    });

  const debouncedSendPayloadToAPI = useCallback(
    debounce(updateUserSettings, 1000),
    []
  );

  const {
    data: userData,
    isLoading: userIsLoading,
    refetch,
  } = useGetMeQuery({});
  //@ts-ignore
  const dropdownRef = useRef(null);

  const userNavigation = [
    {
      name: `${home ? "Dashboard" : "Profile"}`,
      icon: "icon-account",
      href: `${home ? "/app/galleryview" : "/app/profile"}`,
    },
    { name: "Privacy Settings", icon: "icon-log-out" },
    { name: "Logout", icon: "icon-log-out" },
  ];

  const handleLogout = () => {
    try {
      Cookies.remove("access_token");
      Cookies.remove("user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocation = (key: keyof LocationSettings, value: boolean) => {
    setWhoSeeMyLocation(() => {
      // Ensure the new state matches the expected type
      const newState: LocationSettings = {
        everyone: false,
        friends_only: false,
        nobody: false,
        [key]: value,
      };
      return newState;
    });

    const payload = {
      settings: {
        who_see_my_location: value
          ? WhoCanSeeLocation[
              key.toUpperCase() as keyof typeof WhoCanSeeLocation
            ]
          : "",
        who_see_trip: whoSeeMyTrip.nobody
          ? WhoCanSeeTrip.NOBODY
          : whoSeeMyTrip.friends_only
          ? WhoCanSeeTrip.FRIENDS_ONLY
          : WhoCanSeeTrip.EVERYONE,

        who_send_friend_request: whoSendFriendRequest.nobody
          ? WhoCanSendFriendRequest.NOBODY
          : WhoCanSendFriendRequest.EVERYONE,
      },
    };

    debouncedSendPayloadToAPI(payload);
  };

  const handleTrip = (key: string, value: boolean) => {
    setWhoSeeMyTrip(() => {
      // Ensure the new state matches the expected type
      const newState = {
        everyone: false,
        friends_only: false,
        nobody: false,
        [key]: value,
      };
      return newState;
    });

    const payload = {
      settings: {
        who_see_trip: value
          ? WhoCanSeeTrip[key.toUpperCase() as keyof typeof WhoCanSeeTrip]
          : "",
        who_see_my_location: whoSeeMyLocation.nobody
          ? WhoCanSeeLocation.NOBODY
          : whoSeeMyLocation.friends_only
          ? WhoCanSeeLocation.FRIENDS_ONLY
          : WhoCanSeeLocation.EVERYONE,
        who_send_friend_request: whoSendFriendRequest.nobody
          ? WhoCanSendFriendRequest.NOBODY
          : WhoCanSendFriendRequest.EVERYONE,
      },
    };

    debouncedSendPayloadToAPI(payload);
  };

  const handleFriendRequest = (
    key: keyof FriendRequestSettings,
    value: boolean
  ) => {
    setWhoSeeSendFriendRequest(() => {
      // Ensure the new state matches the expected type
      const newState: FriendRequestSettings = {
        everyone: false,
        nobody: false,
        [key]: value,
      };
      return newState;
    });

    const payload = {
      settings: {
        who_send_friend_request: value
          ? WhoCanSendFriendRequest[
              key.toUpperCase() as keyof typeof WhoCanSendFriendRequest
            ]
          : "",
        who_see_trip: whoSeeMyTrip.nobody
          ? WhoCanSeeTrip.NOBODY
          : whoSeeMyTrip.friends_only
          ? WhoCanSeeTrip.FRIENDS_ONLY
          : WhoCanSeeTrip.EVERYONE,

        who_see_my_location: whoSeeMyLocation.nobody
          ? WhoCanSeeLocation.NOBODY
          : whoSeeMyLocation.friends_only
          ? WhoCanSeeLocation.FRIENDS_ONLY
          : WhoCanSeeLocation.EVERYONE,
      },
    };

    debouncedSendPayloadToAPI(payload);
  };

  async function updateUserSettings(payload: any) {
    try {
      await axiosInstance.put(`users/${user?._id}`, payload);

      let existingUserRecord = { ...user };
      existingUserRecord["settings"] = payload.settings;
      Cookies.set("user", JSON.stringify(existingUserRecord));
      localStorage.setItem("user", JSON.stringify(existingUserRecord));
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  }

  return (
    <>
      <OutSideClick
        onOutsideClick={() => {
          setIsOpen(false);
        }}
      >
        {/* @ts-ignore */}
        <Menu as="div" className="relative" onClose={() => setIsOpen(false)}>
          <Menu.Button
            className={`${
              home ? "" : "p-1 pr-2  gap-1.5 flex items-center"
            } rounded-full border`}
            // @ts-ignore
            onClick={() => setIsOpen(!isOpen)} // Toggle dropdown state
          >
            <span className="sr-only">Open user menu</span>
            <ImageComponent
              src={
                userData?.image ||
                "https://res.cloudinary.com/dz7sec6n3/image/upload/v1720796429/user-dummy_rx6reo.jpg"
              }
              fill
              figClassName="w-[34px] h-[34px] xs:h-[28px] xs:w-[28px]"
              className="object-cover rounded-full"
              alt=""
            />
            <div className={`${home && "hidden"} text-base min-w-20`}>
              {userData?.username}
            </div>
            <i
              className={`${
                home && "hidden"
              } icon-down text-[#7F4DEA] text-[8px] text-darkBg transition-transform transform ${
                isOpen ? "rotate-180" : ""
              }`}
            ></i>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className={`${
                home ? "mt-0 w-[150px]" : "mt-4 w-[204px]"
              } absolute right-0 z-10  origin-top-right rounded-md bg-white py-3 shadow-xl focus:outline-none`}
            >
              {userNavigation.map((item, i) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <a
                      href={item.href}
                      onClick={() =>
                        item.name === "Logout"
                          ? handleLogout()
                          : item.name === "Privacy Settings"
                          ? setShow(true)
                          : null
                      }
                      className={clsx(
                        active ? "bg-gray-50" : "",
                        i == 0 || i == 1 ? "text-gray" : "text-[#FF4646] mt-1",
                        "px-6 py-1 text-sm leading-6  font-medium gap-3 flex items-center cursor-pointer"
                      )}
                    >
                      <i
                        className={`${item.icon} ${
                          i == 0 ? "text-primary" : "text-[#FF4646]"
                        }`}
                      ></i>
                      {item.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </OutSideClick>
      <BasicModal
        hide={setShow}
        show={show}
        // iconClass="hidden"
        className="!rounded-[10px]"
      >
        <div className="w-[450px] xs:w-[380px] xs1:w-[320px]  ">
          <div className="my-10 px-5">
            <h3 className="text-base sm:text-lg text-[#001D41] font-medium  ">
              Who can see my location <span className=" font-sans">?</span>
            </h3>
            <div className=" space-y-5 mt-4">
              <div className=" flex justify-between items-center">
                <p className="sm:text-base text-sm">Everyone</p>
                <SwitchComponent
                  isOn={whoSeeMyLocation.everyone}
                  onChangeHandle={(value) => handleLocation("everyone", value)}
                />
              </div>
              <div className=" flex justify-between items-center">
                <p className="sm:text-base text-sm">Friends Only</p>
                <SwitchComponent
                  isOn={whoSeeMyLocation.friends_only}
                  onChangeHandle={(value) =>
                    handleLocation("friends_only", value)
                  }
                />
              </div>
              <div className=" flex justify-between items-center">
                <p className="sm:text-base text-sm">No Body</p>
                <SwitchComponent
                  isOn={whoSeeMyLocation.nobody}
                  onChangeHandle={(value) => handleLocation("nobody", value)}
                />
              </div>
              <h3 className="text-base sm:text-lg text-[#001D41] font-medium  ">
                Who can see my trips <span className=" font-sans">?</span>
              </h3>
              <div className=" flex justify-between items-center">
                <p className="sm:text-base text-sm">Everyone</p>
                <SwitchComponent
                  isOn={whoSeeMyTrip.everyone}
                  onChangeHandle={(value) => handleTrip("everyone", value)}
                />
              </div>
              <div className=" flex justify-between items-center">
                <p className="sm:text-base text-sm">Friends Only</p>
                <SwitchComponent
                  isOn={whoSeeMyTrip.friends_only}
                  onChangeHandle={(value) => handleTrip("friends_only", value)}
                />
              </div>
              <div className=" flex justify-between items-center">
                <p className="sm:text-base text-sm">No Body</p>
                <SwitchComponent
                  isOn={whoSeeMyTrip.nobody}
                  onChangeHandle={(value) => handleTrip("nobody", value)}
                />
              </div>
              <h3 className="text-base sm:text-lg text-[#001D41] font-medium  ">
                Who can send me friend request{" "}
                <span className=" font-sans">?</span>
              </h3>
              <div className=" flex justify-between items-center">
                <p className="sm:text-base text-sm">Everyone</p>
                <SwitchComponent
                  isOn={whoSendFriendRequest.everyone}
                  onChangeHandle={(value) =>
                    handleFriendRequest("everyone", value)
                  }
                />
              </div>

              <div className=" flex justify-between items-center">
                <p className="sm:text-base text-sm">No Body</p>
                <SwitchComponent
                  isOn={whoSendFriendRequest.nobody}
                  onChangeHandle={(value) =>
                    handleFriendRequest("nobody", value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </BasicModal>
    </>
  );
};

export default ProfileDropdown;
