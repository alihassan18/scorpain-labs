import clsx from "clsx";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useGetMeQuery } from "@/redux/slice/api";
import OutSideClick from "react-outside-click-handler";
import { getObjectFromLocalStorage } from "@/utils/storage";
import { IUser } from "@/interfaces/user.interface";
// @ts-ignore
import { Menu, MenuItem, MenuItems } from "@headlessui/react";
import { MdOutlineLogout } from "react-icons/md";
import { FaStreetView, FaRegUserCircle } from "react-icons/fa";
import { AiOutlineApi } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

interface Iprops {
  home?: boolean;
}

const ProfileDropdown = ({ home }: Iprops) => {
  const user: IUser | null = getObjectFromLocalStorage("user");

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: userData,
    isLoading: userIsLoading,
    refetch,
  } = useGetMeQuery({});

  const userNavigation = [
    { name: "Profile", icon: <FaRegUserCircle />, href: "/profile" },
    {
      name: `${home ? "Dashboard" : "Account Overview"}`,
      icon: <FaStreetView />,
      href: `${
        home ? "/profile/account-overview" : "/profile/account-overview"
      }`,
    },
    { name: "Bind API", icon: <AiOutlineApi />, href: "/profile/api" },
    {
      name: "Change Password",
      icon: <RiLockPasswordLine />,
      href: "/profile/change-password",
    },
    { name: "Logout", icon: <MdOutlineLogout />, href: "/auth/login" },
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
            } inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-white `}
            // @ts-ignore
            onClick={() => {
              setIsOpen(!isOpen);
            }} // Toggle dropdown state
          >
            <div
              className={`${home && "hidden"} text-base min-w-20 font-slussen`}
            >
              {/* {userData?.username} */}rfc
            </div>
            <i
              className={`${
                home && "hidden"
              } icon-down text-[#7F4DEA] text-[8px] text-darkBg transition-transform transform ${
                isOpen ? "rotate-180" : ""
              }`}
            ></i>
          </Menu.Button>
          <MenuItems
            transition
            anchor="bottom end"
            className="w-52  bg-[#4169E1] origin-top-right p-1 !rounded-md text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            {userNavigation.map((item, i) => (
              <MenuItem key={item.name}>
                <a
                  href={item.href}
                  onClick={() =>
                    item.name === "Logout" ? handleLogout() : null
                  }
                  className={clsx(
                    true ? "" : "",
                    i == 0 || i == 1 ? "text-gray" : "text-[#00000] mt-1",
                    "px-6 py-1 text-sm leading-6  font-medium gap-3 flex items-center cursor-pointer font-slussen"
                  )}
                >
                  <i
                    className={`font-slussen ${item.icon} ${
                      i == 0 ? "text-primary" : "text-[#00000]"
                    }`}
                  ></i>
                  {item.name}
                </a>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </OutSideClick>
    </>
  );
};

export default ProfileDropdown;
