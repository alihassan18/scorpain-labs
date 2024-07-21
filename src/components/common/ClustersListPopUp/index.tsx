import React, { useEffect, useState } from "react";
import { ImageComponent, SelectComponent } from "../index";
import { sortingOptions } from "@/constants";
import AOS from "aos";
import axiosInstance from "@/api/http";
import { Poi } from "@/types";
import { Loader } from "@/components/common";
import SortSkelton from "../Skeltons/SortSkelton";
import { generateCloudinaryImageUrl } from "@/utils/generateCloudinaryImageUrl";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { addCommasToNumberString, formatRattingNumber } from "@/lib/utils";

type Props = {
  poiIds: any[];
  onCross: any;
  onClickItem?: Function;
};

const ClusterListPopUp = React.memo(
  ({ poiIds, onCross, onClickItem = () => null }: Props) => {
    const limit = 10;

    const [selected, setSelected] = useState("");
    const [poisList, setPoisList] = useState<Poi[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [nextMove, seNextMove] = useState<number>(0);
    const [idsToLoad, setIdsToLoad] = useState<string[]>(
      poiIds.slice(0, limit)
    );

    const observerRef = useIntersectionObserver(() => {
      if (!isLoading && idsToLoad.length === limit) {
        const nextMoveWillBe = nextMove + limit;
        const nextIdsToLoad = poiIds.slice(
          nextMoveWillBe,
          limit + nextMoveWillBe
        );
        seNextMove((prev) => prev + limit);
        setIdsToLoad(nextIdsToLoad);
      }
    });

    useEffect(() => {
      if (selected) {
        let requiredFormat = selected.toLowerCase().replace(" ", "_");
        let existingPois = [...poisList];
        let sortedPois = existingPois.sort(
          (a, b) => b[requiredFormat] - a[requiredFormat]
        );
        setPoisList(sortedPois);
      }
    }, [selected]);

    useEffect(() => {
      if (poiIds.length > 0) {
        fetchPois();
      }
    }, [poiIds, idsToLoad]);

    const fetchPois = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          `poi?limit=1000&page=1&ids=${idsToLoad.join(",")}`
        );
        console.log(response, "response from pois");
        if (response?.data) {
          setPoisList((prev) => [...prev, ...response.data?.data]);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };

    useEffect(() => {
      AOS.init({
        duration: 1000,
        // offset: 200,
        easing: "ease-in-out",
      });
      window.scrollY;
    }, []);
    const handleButtonClick = (e: any) => {
      e.preventDefault();

      e.stopPropagation();
    };

    return (
      <>
        <div
          className="relative z-50 top-4 left-4 xs:left-0 xs:top-2  bg-white/95 shadow-2xl drop-shadow-2xl rounded-[20px] sm:w-[524px] w-full p-3.5"
          data-aos="fade-right"
        >
          <div className="flex justify-between gap-4 items-center">
            <SelectComponent
              Data={sortingOptions}
              selected={selected}
              setSelected={setSelected}
              placeholder="Sort by"
              className="!h-[36px] !border !border-[#E2E2E2]"
              takeLabelAsValue={true}
            />
            <div
              className="h-[22px] w-[22px] flex-shrink-0 flex justify-center items-center cursor-pointer rounded-full bg-black"
              onClick={() => onCross()}
            >
              <i className="icon-cross cursor-pointer text-[9px] text-white font-normal  flex-shrink-0" />
            </div>
          </div>
          <div
            className="max-h-[63vh] overflow-auto AtScrollHide grid grid-cols-2 gap-2"
            onClick={handleButtonClick}
          >
            {isLoading && poisList.length === 0 ? (
              <>
                {Array(12)
                  .fill("")
                  .map((item, i) => (
                    <div className="mt-2" key={i}>
                      <SortSkelton />
                    </div>
                  ))}
              </>
            ) : (
              poisList.length > 0 &&
              poisList.map((item) => (
                <div
                  className="bg-white  rounded-xl shadow-md border border-borderColor mt-2 cursor-pointer   overflow-hidden"
                  key={item._id}
                  onClick={() => onClickItem(item)}
                >
                  <ImageComponent
                    src={
                      item.images[0]
                        ? generateCloudinaryImageUrl(
                            item.images[0],
                            242,
                            81,
                            100,
                            true
                          )
                        : "/assets/images/placeholder.png"
                    }
                    fill
                    figClassName="w-full h-[81px] !flex-shrink-0"
                    className="rounded-t-lg  object-cover !flex-shrink-0"
                    alt=""
                  />
                  <div className="p-3 ">
                    <div className="flex justify-between items-center space-x-3 ">
                      <h6 className=" font-normal text-xs xs1:text-[10px] max-w-[60%] truncate">
                        {item?.title}
                      </h6>
                      <div className="flex gap-x-2 items-center">
                        <i className="icon-fillstar text-[#FFD33C] xs1:text-[10px] text-xs"></i>
                        <div className="font-normal xs1:text-[10px] text-[10px]">
                          {formatRattingNumber(item?.google_rating) ?? "0.0"}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs xs1:text-[10px] text-[#878787] font-medium w-full -mt-2 truncate">
                      {item?.city},{item?.country}
                    </p>
                    <h3 className="text-xs xs1:text-[10px] text-[#878787] font-medium  l max-w-[8rem]  mt-1   truncate ">
                      {item?.tags &&
                        item?.tags.map((tag: string, index: number) => (
                          <span>{`${tag}${
                            item?.tags[index + 1] ? "," : ""
                          }`}</span>
                        ))}
                    </h3>
                    <div className=" flex justify-between items-center mt-1">
                      <h3 className="text-xs xs1:text-[10px] text-[#878787]  font-medium ">
                        Yolo Score {Number(item?.yolo_score || 0).toFixed(0)}
                      </h3>
                      <p className=" text-xs xs1:text-[10px]  text-[#007ACE]">
                        {item?.google_reviews
                          ? addCommasToNumberString(item?.google_reviews)
                          : 0}{" "}
                        Reviews
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div
              className="h-full items-center justify-center"
              ref={observerRef}
            ></div>
          </div>
        </div>
      </>
    );
  }
);

export default ClusterListPopUp;
