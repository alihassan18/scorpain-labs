"use client";
import { Button, Container, ImageComponent } from "@/components/common";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import ProfileDropdown from "../ProfileDropdown";
import { ReduxProvider } from "@/redux/Provider/ReduxProvider";
const Navigation = [
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Features",
    href: "#friendmap",
  },

  {
    name: "Reviews",
    href: "#reviews",
  },
  {
    name: "FAQ’s",
    href: "#faqs",
  },
];

export default function Navbar() {
  const [navbar, setNavbar] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [scrollBackground, setScrollBackground] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const userToken = Cookies.get("access_token");

  useEffect(() => {
    if (userToken) {
      setToken(userToken);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    // toast.success("User logout successfully");
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window != undefined ? window.scrollY : 0;

      if (currentScrollY > prevScrollY) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }
      setPrevScrollY(currentScrollY);
    };
    window != undefined && window.addEventListener("scroll", handleScroll);
    return () => {
      window != undefined && window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window != undefined ? window.scrollY : 0;
      if (scrollPosition > 10) {
        setScrollBackground(true);
      } else {
        setScrollBackground(false);
      }
    };

    window != undefined && window.addEventListener("scroll", handleScroll);

    return () => {
      window != undefined && window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <ReduxProvider>
      <nav
        className={` ${scrollBackground ? "fixed bg-[#04172B]/80" : "fixed"}
     ${isScrolledDown ? "-top-28" : "top-0 "}
      z-50 w-full duration-300 ease-linear
     `}
        id="feature"
      >
        <Container className="" size="lg">
          <Transition.Root show={navbar} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-50 md:hidden"
              onClose={setNavbar}
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
                  <Dialog.Panel className="relative flex flex-1 w-full max-w-[70vw] mr-16">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 pt-5  z-20 -right-8 px-5">
                        <button
                          type="button"
                          className="-m-2 p-2 flex justify-center items-center h-10 w-10 bg-white rounded-full"
                          onClick={() => setNavbar(false)}
                        >
                          <span className="sr-only">Close sidebar</span>
                          <i className="text-base icon-close !text-black" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div
                      className={`overflow-hidden duration-300 ease-linear gap-10 flex flex-col justify-between w-[90vw] bg-[#4345A3] p-8`}
                    >
                      <ul className="space-y-12">
                        {Navigation?.map((item, i) => (
                          <Link href={item.href} key={i}>
                            <li className="text-white md:mb-0 mb-12 text-lg font-normal relative border-b border-[#C0C0FF]">
                              {item.name}
                              {/* {!item.name && (
                      <div className="p-[3px] rounded-full bg-primary lg:block hidden"></div>
                    )} */}
                            </li>
                          </Link>
                        ))}
                      </ul>
                      <div className="flex gap-4 items-center">
                        {token ? (
                          <span
                            onClick={handleLogout}
                            className="text-white font-semibold text-[17px] cursor-pointer"
                          >
                            Log Out
                          </span>
                        ) : (
                          <Link href="/auth/sign-up ">
                            <span className="text-white font-semibold text-[17px] cursor-pointer">
                              Sign Up
                            </span>
                          </Link>
                        )}
                        {token ? (
                          <Link href="/app/galleryview">
                            <Button className="">Dashboard</Button>
                          </Link>
                        ) : (
                          <Link href="/auth/login">
                            <Button className="!px-7 !py-2.5">Login</Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
          <div className="justify-between mx-auto md:flex md:items-center">
            <div className="flex items-center justify-center md:justify-between py-3 md:block md:py-6 relative">
              <button
                className="rounded-md p-1.5 text-gray-700 outline-none focus:border focus:border-gray-400 md:hidden absolute left-0"
                onClick={() => setNavbar(!navbar)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <Link href="/" className="">
                <ImageComponent
                  src="/assets/images/home1/Logo.svg"
                  fill
                  figClassName="w-[200px] xs:w-[135px] xs:h-[35px] h-[50px]"
                  className="object-contain rounded-full"
                  alt=""
                />
              </Link>
              <div className="absolute right-0 md:hidden">
                {token ? (
                  <span className="block mt-2">
                    <ProfileDropdown home />
                  </span>
                ) : (
                  <Link href="/auth/login">
                    <Button className="!px-5 !py-1">
                      <span className="block mb-1 ">Login</span>
                    </Button>
                  </Link>
                )}
              </div>
              {/* <div className="flex items-center gap-3 md:hidden">
              <button
                className="rounded-md p-1.5 text-gray-700 outline-none focus:border focus:border-gray-400"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-black"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293
                      4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  ""
                )}
              </button>
            </div> */}
            </div>
            <div
              className={`overflow-hidden duration-300 ease-linear gap-10 md:flex hidden ${
                navbar
                  ? "min-h-72 pt-2 md:h-auto md:pb-0 md:pt-0 "
                  : "mt-0 h-0 md:h-auto"
              }`}
            >
              <ul className="items-center justify-center md:gap-0 md:flex md:space-x-5 lg:space-x-10">
                {Navigation?.map((item, i) => (
                  <Link href={item.href} key={i}>
                    <li className="text-white md:mb-0 mb-4 text-lg font-normal relative">
                      {item.name}
                      {/* {!item.name && (
                      <div className="p-[3px] rounded-full bg-primary lg:block hidden"></div>
                    )} */}
                    </li>
                  </Link>
                ))}
              </ul>
              <div className="flex gap-4 items-center">
                {token ? (
                  <span
                    onClick={handleLogout}
                    className="text-white font-semibold text-[17px] cursor-pointer"
                  >
                    Log Out
                  </span>
                ) : (
                  <Link href="/auth/sign-up ">
                    <span className="text-white font-semibold text-[17px] cursor-pointer">
                      Sign Up
                    </span>
                  </Link>
                )}
                {token ? (
                  <Link href="/app/galleryview">
                    <Button className="">Dashboard</Button>
                  </Link>
                ) : (
                  <Link href="/auth/login">
                    <Button className="!px-7 !py-2.5">Login</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </ReduxProvider>
  );
}
