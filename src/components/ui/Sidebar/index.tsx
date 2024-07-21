"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImageComponent } from "@/components/common";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Lock from "@/components/common/Icons/Lock";
import BasicModal from "../BasicModal/BasicModal";
import { useState } from "react";
import { SwitchComponent } from "@/components/common/index";

// import ChatHistory from "@/components/chat/ChatHistory";

const navigation = [
  {
    name: "POI’s",
    href: "/app/galleryview",
    href1: "/app",
    icon: "icon-home",
    current: false,
    src: "/assets/images/dashboard/poi.svg",
    style: "w-[130px] h-[100px]",
  },
  {
    name: "Friends Map",
    href: "/app/friendsMap",
    icon: "icon-location",
    current: true,
    src: "/assets/images/dashboard/friend.svg",
    style: "w-[200px] h-[100px]",
  },

  // {
  //   name: "Weather",
  //   href: "/dashboard/my-jobs",
  //   icon: "icon-weather",
  //   current: false,
  //   src: "/assets/images/dashboard/weather.svg",
  //   style: "w-[160px] h-[100px]",
  // },
  // {
  //   name: "Hotspot",
  //   href: "/dashboard/ai-tools",
  //   icon: "icon-sport",
  //   current: false,
  //   src: "/assets/images/dashboard/hotsport.svg",
  //   style: "w-[160px] h-[100px]",
  // },
  // {
  //   name: "POI’s",
  //   href: "/dashboard/career-tracker",
  //   icon: "icon-home",
  //   current: false,
  //   src: "/assets/images/dashboard/poi.svg",
  //   style: "w-[130px] h-[100px]",
  // },
  // {
  //   name: "Personal Recommendation",
  //   href: "/dashboard/resume",
  //   icon: "icon-check",
  //   current: false,
  //   src: "/assets/images/dashboard/personal.svg",
  //   style: "w-[314px] h-[100px]",
  // },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [show, setShow] = useState(false);

  const handleLogout = () => {
    try {
      Cookies.remove("access_token");
      Cookies.remove("user");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex grow flex-col AtScrollHide bg-white h-full">
        <div className="pt-5 shrink-0 flex justify-center items-center pb-10 relative w-[50px] h-[50px] md:w-auto md:h-auto">
          <Link
            href="/app/galleryview"
            className="h-[50px] w-[50px] md:block hidden"
          >
            <ImageComponent
              src="/assets/images/maplogo.svg"
              fill
              figClassName="h-full w-full flex-shrink-0"
              className="object-contain"
              alt=""
            />
          </Link>
          <div className="absolute bg-[#E2E2E2] w-[37px] md:block hidden h-[1px] bottom-0 left-1/2 -translate-x-1/2"></div>
        </div>
        <nav className="flex flex-1 flex-col gap-5 md:items-center px-4 md:px-0">
          <ul role="list" className="space-y-12 md:space-y-[70px] mt-10">
            {navigation.map((item) => (
              <li
                key={item.name}
                className="relative group cursor-pointer flex items-center gap-2"
              >
                <Link href={item.href}>
                  <div
                    className={` ${
                      pathname === item.href || pathname === item.href1
                        ? " AtBtn"
                        : ""
                    } flex items-center justify-center h-10 w-10 flex-shrink-0 rounded-full relative`}
                  >
                    <i
                      className={classNames(
                        pathname === item.href || pathname === item.href1
                          ? // (item.href == "//choose" &&
                            //   pathname?.includes("choose")) ||
                            // (item.href == "/dashboard/automate" &&
                            //   pathname?.includes("automate")) ||
                            // (item.href == "/dashboard/launch" &&
                            //   pathname?.includes("launch")) ||
                            // (item.href == "/dashboard/duplicate" &&
                            //   pathname?.includes("duplicate"))
                            " text-white"
                          : " text-primary",
                        "text-xl shrink-0 flex items-center justify-center",
                        item.icon
                      )}
                      aria-hidden="true"
                    />
                  </div>
                </Link>
                <div className="absolute left-full top-1/2 -translate-y-1/2 z-[1000] hidden group-hover:block">
                  <ImageComponent
                    figClassName={`${item.style} md:block hidden`}
                    fill
                    className="object-cover"
                    src={item.src}
                    alt=""
                  />
                </div>
                <p className="text-[#7F4DEA] text-xs font-medium md:hidden block">
                  {item.name}
                </p>
              </li>
            ))}
            <li
              className="px-2.5 md:hidden flex items-center gap-3 "
              onClick={() => setShow(true)}
            >
              <Lock />
              <p className="text-[#7F4DEA] text-xs font-medium md:hidden block">
                Privacy Settings
              </p>
            </li>
          </ul>
          {/* <ChatHistory /> */}
        </nav>
        <div className="px-4 pb-3 md:hidden block">
          <div
            className="bg-[#FF2626] w-[72px] px-4 py-2.5 rounded-full text-center"
            onClick={() => handleLogout()}
          >
            <p className="text-sm text-white">Logout</p>
          </div>
        </div>
      </div>
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
                <SwitchComponent />
              </div>
              <div className=" flex justify-between items-center">
                <p className="sm:text-base text-sm">Friends Only</p>
                <SwitchComponent />
              </div>
              <div className=" flex justify-between items-center">
                <p className="sm:text-base text-sm">No Body</p>
                <SwitchComponent />
              </div>
              <h3 className="text-base sm:text-lg text-[#001D41] font-medium  ">
                Who can send me friend request{" "}
                <span className=" font-sans">?</span>
              </h3>
              <div className=" flex justify-between items-center">
                <p className="sm:text-base text-sm">Everyone</p>
                <SwitchComponent />
              </div>

              <div className=" flex justify-between items-center">
                <p className="sm:text-base text-sm">No Body</p>
                <SwitchComponent />
              </div>
            </div>
          </div>
        </div>
      </BasicModal>
    </>
  );
};

export default Sidebar;
