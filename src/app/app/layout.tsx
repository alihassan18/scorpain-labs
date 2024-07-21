"use client";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Sidebar from "@/components/ui/Sidebar";
import ProfileDropdown from "@/components/ui/ProfileDropdown";
import { Angle, Menue, Notifications } from "@/components/common/Icons";
import Link from "next/link";
import Mapview from "./mapview";
import ReactFlagsSelect from "react-flags-select";
// @ts-ignore
import OutSideClick from "react-outside-click-handler";

import {
  Button,
  GallerySelect,
  ImageComponent,
  SearchComponent,
  SearchFilter,
} from "@/components/common/index";
import BasicModal from "@/components/ui/BasicModal/BasicModal";
import { ToastContainer } from "react-toastify";
import AddFriendModel from "@/components/ui/AddFriendModel/AddFriendModel";
import { ReduxProvider } from "@/redux/Provider/ReduxProvider";
import SearchFilterCom from "@/components/common/Search/SearchFilter";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import SearchedFriendsDropdown from "@/components/common/Search/SearchedFriendsDropdown";
import ProfileImage from "@/components/ui/PorfileImage/index";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState("");
  const [filter, setFilterOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterNumber, setFilterNumber] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const [state, setState] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  const isShowSearch = (): boolean => {
    if (pathname === "/app/friendsMap") return false;
    return true;
  };

  const isShowMapViewButton = (): boolean => {
    if (pathname === "/app/friendsMap") return false;
    return true;
  };

  const isShowGalleryViewButton = (): boolean => {
    if (pathname === "/app/friendsMap") return false;
    return true;
  };

  const isShowHeader = (): boolean => {
    if (pathname === "/app/friendRequest") return false;
    return true;
  };

  const isShowSidebar = (): boolean => {
    if (pathname === "/app/friendRequest") return false;
    return true;
  };

  return (
    <ReduxProvider>
      <div className="relative flex gap-2 bg-white">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex flex-1 w-full max-w-xs mr-16">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 flex items-center justify-between pt-5 left-0 z-20 w-full px-5">
                      <button
                        type="button"
                        className="-m-2 p-2 flex justify-center items-center h-10 w-10 bg-black rounded-full"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <i className="text-base icon-close !text-white" />
                      </button>
                      {/* <ProfileDropdown /> */}
                      <ProfileImage />
                    </div>
                  </Transition.Child>
                  <Sidebar />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        {/* Sidebar for desktop */}
        {isShowSidebar() && (
          <div className="w-[60px] sm:w-[90px] fixed top-0 left-0 shadow shadow-right z-50 h-full md:block hidden">
            <Sidebar />
          </div>
        )}

        <div className="w-full relative md:pl-[85px]">
          {isShowHeader() && (
            <div
              className={`bg-white relative sm:sticky top-0 w-full ${
                filter ? "min-h-[60px]" : "min-h-[60px]"
              } p-3 sm:px-5 sm:gap-x-6 z-40 top-0 rounded-larg rounded-t-none shadow-sm `}
            >
              <div className="shrink-0 items-center flex gap-x-4 flex-wrap w-full">
                <div
                  className="flex justify-between items-center gap-2 sm:gap-4 md:flex-wrap h-full w-full"
                  aria-hidden="true"
                >
                  <div className="flex items-center gap-2 lg:w-[30%] xl:w-[50%] w-full">
                    <button
                      type="button"
                      className="h-10 w-10 xs:h-8 xs:w-8 rounded-full border border-[#DADADA] flex justify-center cursor-pointer items-center flex-shrink-0 md:hidden"
                      onClick={() => setSidebarOpen(true)}
                    >
                      <span className="sr-only">Open sidebar</span>
                      <Menue />
                    </button>
                    <div
                      className={` ${
                        pathname == "/app/profile" ||
                        pathname == "/app/friendRequest" ||
                        pathname == `/app/profile/${id}`
                          ? "hidden"
                          : "block"
                      } w-full lg:w-[500px]`}
                    >
                      {isShowSearch() && (
                        <SearchFilterCom placeholder="Search point of interest" />
                      )}

                      {/* For search friends on friends map  */}
                      {pathname == "/app/friendsMap" && (
                        <OutSideClick
                          onOutsideClick={() => {
                            setIsOpen(false);
                          }}
                        >
                          <div
                            onClick={() => setIsOpen(!isOpen)}
                            className="relative"
                          >
                            <SearchFilterCom placeholder="Search Friends" />
                            <div
                              className={` 
                           border border-white outline-none   p-4  shadow-lg rounded-[20px] max-h-[450px] overflow-auto AtScrollHide  w-full   bg-white
                            absolute   !z-[99999] ${
                              isOpen ? "block" : "hidden"
                            } `}
                            >
                              <SearchedFriendsDropdown />
                            </div>
                          </div>
                        </OutSideClick>
                      )}
                    </div>
                  </div>

                  {/* <div className="flex items-center gap-2 xl:w-[50%] w-full lg:w-[30%]">
                    <button
                      type="button"
                      className="h-10 w-10 rounded-full border border-[#DADADA] flex justify-center cursor-pointer items-center flex-shrink-0 md:hidden"
                      onClick={() => setSidebarOpen(true)}
                    >
                      <span className="sr-only">Open sidebar</span>
                      <Menue />
                    </button>
                    <div
                      className="relative w-full md:-mt-[5px] lg:max-w-[500px]"
                      onClick={() => {
                        setSearchOpen(true);
                      }}
                    >
                    
                      <SearchFilterCom placeholder="Search point of interest" />
                      {searchOpen && (
                        <div className="absolute w-[642px] z-20 h-200">
                          <SearchFilter />
                        </div>
                      )}
                    </div>
                  </div> */}
                  <div className="flex items-center gap-3">
                    {isShowMapViewButton() && (
                      <Link href="/app" className="">
                        <Button className="!py-[2px] !px-[2px] w-full md:inline-flex hidden">
                          <span
                            className={`${
                              pathname == "/app"
                                ? ""
                                : "bg-white rounded-full text-black block w-full"
                            } py-2.5 px-4 sm:px-10`}
                          >
                            Map View
                          </span>
                        </Button>
                        <i
                          className={`${
                            pathname == "/app"
                              ? "AtBtn text-white"
                              : "bg-[#E2E2E2] text-[#ACACAC]"
                          } md:hidden icon-mapview h-10 w-10 xs:h-8 xs:w-8 flex xs:text-sm justify-center flex-shrink-0 items-center rounded-full`}
                        ></i>
                      </Link>
                    )}
                    {isShowGalleryViewButton() && (
                      <Link href="/app/galleryview" className="">
                        <Button className="!px-[2px] !py-[2px] w-full md:inline-flex hidden">
                          <span
                            className={`${
                              pathname == "/app/galleryview"
                                ? ""
                                : "bg-white rounded-full text-black block w-full"
                            } py-2.5 px-4 sm:px-10`}
                          >
                            Gallery View
                          </span>
                        </Button>
                        <i
                          className={`${
                            pathname == "/app/galleryview"
                              ? "AtBtn text-white"
                              : "bg-[#E2E2E2] text-[#ACACAC]"
                          }  md:hidden icon-galleryview h-10 w-10 xs:h-8 xs:w-8 xs:text-sm flex justify-center flex-shrink-0 items-center rounded-full`}
                        ></i>
                      </Link>
                    )}
                    <div
                      className="w-10 h-10 rounded-full xs:h-8 xs:w-8 border-gradient flex justify-center items-center cursor-pointer"
                      onClick={() => setState(true)}
                    >
                      <svg
                        className=""
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.93359 20C1.50211 20 1.15234 19.6502 1.15234 19.2188C1.15234 15.2986 4.3416 12.1094 8.26172 12.1094H9.43359C10.2358 12.1094 11.0236 12.2422 11.7749 12.5041C12.1823 12.6461 12.3975 13.0916 12.2554 13.499C12.1134 13.9064 11.6679 14.1216 11.2605 13.9795C10.6749 13.7754 10.0603 13.6719 9.43359 13.6719H8.26172C5.20316 13.6719 2.71484 16.1602 2.71484 19.2188C2.71484 19.6502 2.36508 20 1.93359 20ZM14.043 5.27344C14.043 2.36566 11.6773 0 8.76953 0C5.86176 0 3.49609 2.36566 3.49609 5.27344C3.49609 8.18121 5.86176 10.5469 8.76953 10.5469C11.6773 10.5469 14.043 8.18121 14.043 5.27344ZM12.4805 5.27344C12.4805 7.31965 10.8157 8.98438 8.76953 8.98438C6.72332 8.98438 5.05859 7.31965 5.05859 5.27344C5.05859 3.22723 6.72332 1.5625 8.76953 1.5625C10.8157 1.5625 12.4805 3.22723 12.4805 5.27344ZM18.0664 15.3125H15.7227V12.9688C15.7227 12.5373 15.3729 12.1875 14.9414 12.1875C14.5099 12.1875 14.1602 12.5373 14.1602 12.9688V15.3125H11.8164C11.3849 15.3125 11.0352 15.6623 11.0352 16.0938C11.0352 16.5252 11.3849 16.875 11.8164 16.875H14.1602V19.2188C14.1602 19.6502 14.5099 20 14.9414 20C15.3729 20 15.7227 19.6502 15.7227 19.2188V16.875H18.0664C18.4979 16.875 18.8477 16.5252 18.8477 16.0938C18.8477 15.6623 18.4979 15.3125 18.0664 15.3125Z"
                          fill="#7F4DEA"
                        />
                      </svg>
                    </div>

                    <span className="hidden md:block">
                      <ProfileDropdown />
                    </span>
                  </div>
                </div>
              </div>
              {pathname == "/app/galleryview" ||
              pathname == "/app" ||
              pathname == "/app/favoritegallery" ? (
                <GallerySelect setFilterNumber={setFilterNumber} />
              ) : (
                ""
              )}
            </div>
          )}

          <main
            // className={`h-screen overflow-auto AtScrollHide relative bg-lightBg `}
            className={`bg-lightBg `}
          >
            <div
              className={`pb-5 ${
                pathname == "/app/profile" || pathname == `/app/profile/${id}`
                  ? "xs:px-0 px-4"
                  : "px-4"
              }  md:pr-4 AtHeading`}
              onClick={() => {
                setSearchOpen(false);
              }}
            >
              {children}
            </div>
          </main>
        </div>

        <BasicModal
          hide={setState}
          show={state}
          // iconClass="hidden"
          className="!rounded-[33px]"
        >
          {/* <div className="lg:w-[980px] md:w-[700px] sm:w-[600px] w-full">
            <Mapview />
          </div> */}
          <div className="w-[450px] xs:w-[380px] xs1:w-[320px]">
            <AddFriendModel setState={setState} />
          </div>
        </BasicModal>
      </div>
    </ReduxProvider>
  );
}
