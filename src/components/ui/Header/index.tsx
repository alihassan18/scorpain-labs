"use client";
import { Button, Container, ImageComponent } from "@/components/common";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useState, useEffect } from "react";
import Cookies from "js-cookie";
import ProfileDropdown from "../ProfileDropdown";
import { ReduxProvider } from "@/redux/Provider/ReduxProvider";
import { MdOutlineHome, MdCloudQueue } from "react-icons/md";

const Navigation = [
  {
    name: "Home",
    icon: <MdOutlineHome />,
    href: "/profile",
  },
  {
    name: "Features & Pricing",
    icon: <MdCloudQueue />,
    href: "#price",
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
  }, [userToken]);

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
      <nav className="bg-main z-[99999]" id="feature">
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
                      <div className="absolute top-0 pt-5 z-[20000000000] -right-8 px-5">
                        <button
                          type="button"
                          className="-m-2 p-2 flex justify-center font-slussen items-center h-10 w-10 z-50 relative bg-white rounded-full"
                          onClick={() => setNavbar(false)}
                        >
                          <span className="sr-only font-slussen">
                            Close sidebar
                          </span>
                          <i className="text-base icon-close !text-black" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div
                      className={`z-[999999] h-screen fixed duration-300 ease-linear gap-10 flex flex-col justify-between w-[70vw] bg-blue-dark p-8`}
                    >
                      <div>
                        <ImageComponent
                          src="/assets/images/logo-new.png"
                          fill
                          figClassName="w-[200px] xs:w-[135px] xs:h-[35px] h-[50px]"
                          className="object-contain rounded-full"
                          alt=""
                        />
                        <ul className="space-y-12 mt-10">
                          {Navigation?.map((item, i) => (
                            <Link href={item.href} key={i}>
                              <li className="text-white font-slussen md:mb-0 mb-12 text-lg font-normal relative pb-2 flex gap-3 items-center border-b">
                                <span>{item.icon}</span>
                                {item.name}
                              </li>
                            </Link>
                          ))}
                        </ul>
                      </div>
                      <div className="flex gap-4 items-center">
                        {token ? (
                          <span
                            onClick={handleLogout}
                            className="text-white font-semibold text-[17px] cursor-pointer font-slussen"
                          >
                            Logout
                          </span>
                        ) : (
                          <>
                            <Link
                              href="/auth/login"
                              className="text-white md:mb-0 mb-4 text-lg font-normal font-slussen relative flex items-center gap-2"
                            >
                              Login
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
          <div className="justify-between mx-auto md:flex md:items-center">
            <div className="flex items-center justify-center md:justify-between py-3 md:block relative">
              <button
                className="rounded-md p-1.5 text-blue-dark outline-none focus:border focus:border-gray-400 md:hidden absolute left-0"
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
                  src="/assets/images/logo-new.png"
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
                  <Link
                    href="/auth/login"
                    className="text-white font-slussen md:mb-0 text-lg font-normal relative flex items-center gap-2"
                  >
                    Login
                  </Link>
                )}
              </div>
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
                    <li className="text-white font-slussen hover:text-primary md:mb-0 mb-4 text-lg font-normal relative flex items-center gap-2">
                      <span className="">{item.icon}</span>
                      {item.name}
                    </li>
                  </Link>
                ))}
              </ul>
              <div className="flex gap-4 items-center">
                {token ? (
                  <span className="block mt-2">
                    <ProfileDropdown />
                  </span>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="text-white font-slussen hover:text-primary md:mb-0 mb-4 text-lg font-normal relative flex items-center gap-2"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </ReduxProvider>
  );
}
