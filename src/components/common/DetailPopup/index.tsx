import React, { useEffect, useState } from "react";
import ImageComponent from "../ImageComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Location from "../Icons/Location";
import Dollar from "../Icons/Dollar";
import { Poi } from "@/types";
import StarRating from "../Ratings";
import AOS from "aos";
import BasicModal from "@/components/ui/BasicModal/BasicModal";
import Gallery from "../Icons/Gallery";
import axiosInstance from "@/api/http";
import { generateCloudinaryImageUrl } from "@/utils/generateCloudinaryImageUrl";
import { addCommasToNumberString, formatRattingNumber } from "@/lib/utils";

type Props = {
  onClose: any;
  poi: Poi;
  from?: "mapView" | "gallaryView";
};

const DetailPopup = ({ onClose, poi, from }: Props) => {
  const [gallery, setGallery] = useState(false);
  const [poiDetail, setPoiDetail] = useState(poi);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      // offset: 200,
      easing: "ease-in-out",
    });
    window.scrollY;
  }, []);

  useEffect(() => {
    if (from === "mapView") {
      fetchPoi(poi?._id);
    }
  }, [poi]);

  const fetchPoi = async (id: string) => {
    try {
      const response = await axiosInstance.get(`poi?ids=${id}`);
      if (response?.data) {
        setPoiDetail(response.data?.data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formattedYoloScore = poiDetail
    ? Math.floor(poiDetail?.yolo_score)
    : null;

  return (
    <>
      <div
        className={`relative top-0 z-50    shadow-2xl drop-shadow-2xl rounded-[20px] w-[480px] bg-white/95 overflow-hidden xs:w-[380px] xs1:w-[340px]  p-3.5`}
        data-aos="fade-right"
      >
        <div className="flex justify-end mb-5 cursor-pointer" onClick={onClose}>
          <i
            className="icon-cross  text-base flex-shrink-0"
          />
        </div>
        <div className="h-[60vh] overflow-auto AtScrollHide">
          <div className="pr-2">
            <div className="rounded-[10px] overflow-hidden relative flex justify-center items-center">
              <Swiper
                modules={[Navigation]}
                navigation={poiDetail?.images?.length > 1 ? true : false}
                style={{ position: "unset" }}
                className="AtSocialSlider  bg-white w-full h-full"
                spaceBetween={0}
                slidesPerView={1}
                breakpoints={{
                  300: {
                    slidesPerView: 1,
                  },
                }}
              >
                {poiDetail?.images?.length > 0 ? (
                  poiDetail.images?.map((e: any, index: number) => (
                    <SwiperSlide key={index} className="relative">
                      <ImageComponent
                        src={generateCloudinaryImageUrl(e, 444, 170, 100, true)}
                        fill
                        // height={425.48}
                        // width={900}
                        figClassName="h-[170px] w-full"
                        className="w-full object-cover"
                      />
                      <div
                        className=" absolute top-2 right-2  bg-[#232323]   rounded-md p-1.5  cursor-pointer"
                        onClick={() => {
                          setGallery(true);
                        }}
                      >
                        <Gallery />
                      </div>
                    </SwiperSlide>
                  ))
                ) : (
                  <ImageComponent
                    src={"/assets/images/placeholder.png"}
                    fill
                    // height={425.48}
                    // width={900}
                    figClassName="h-[170px]  w-full"
                    className="w-full  object-cover"
                  />
                )}
              </Swiper>
            </div>
            <p className="text-black font-bold text-3xl mt-6 line-clamp-2">
              {poiDetail?.title}
            </p>
            <h3 className="xs:text-xs text-sm text-[#878787] font-medium    mt-2   truncate ">
              {poiDetail?.tags &&
                poiDetail?.tags.map((tag: string, index: number) => (
                  <span>{`${tag}${
                    poiDetail?.tags[index + 1] ? "," : ""
                  }`}</span>
                ))}
            </h3>
            <p className="text-base font-normal text-black mt-2">
              {poiDetail?.short_desc}
            </p>
            {/* <h1 className="text-[20px] mt-2 font-normal">Amenities</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
              <div className="flex gap-2">
                <Dollar />
                <p className="text-base text-[#202020]">Collection possible</p>
              </div>
              <div className="flex gap-5">
                <i className="icon-location1 text-2xl"></i>
                <p className="text-base text-[#202020]">No reservations</p>
              </div>
              <div className="flex gap-5">
                <Location />
                <p className="text-base text-[#202020]">Chic</p>
              </div>
              <div className="flex gap-5">
                <i className="icon-clock1 text-2xl"></i>
                <p className="text-base text-[#202020]">Suitable for groups</p>
              </div>
            </div> */}
            <h6 className="sm:text-[20px] text-base mt-3 font-normal">
              Rating & Reviews
            </h6>
            <div className="pt-2 flex flex-col items-center">
              <div className="">
                <StarRating rating={poi?.google_rating} />
              </div>
              <div className="font-semibold text-sm flex items-center gap-2 mb-2">
                <div className=" text-lg  font-normal font text-[#007ACE] ">
                  {formatRattingNumber(poiDetail?.google_rating) || 0}
                  <span className="text-[#5F5F5F]"> Rating</span>
                </div>
                <div className="bg-[#5F5F5F] w-[2px] h-4"></div>
                <p className="text-lg  text-[#007ACE]">
                  {/* {poi?.google_reviews
                  ? ` ${poi?.google_reviews} ${
                      poi?.google_reviews == "1" ? (
                        <span className="text-[#5F5F5F]">Review</span>
                      ) : (
                        <span className="text-[#5F5F5F]">Reviews</span>
                      )
                    }`
                  : ""} */}
                  {/* {poi?.google_reviews && ( */}
                  <>
                    {addCommasToNumberString(poiDetail.google_reviews) || 0}{" "}
                    <span className="text-[#5F5F5F]">Reviews</span>
                  </>
                  {/* )} */}
                </p>
              </div>

              <div className=" text-sm flex items-center gap-2 mb-2">
                <ImageComponent
                  src="/assets/images/maplogo.svg"
                  fill
                  figClassName="h-4 w-4 flex-shrink-0"
                  className=" rounded-full"
                  alt=""
                />
                <p className="xs:text-sm  text-lg  text-[#5F5F5F]">
                  <span className="text-[#007ACE]">{formattedYoloScore}</span>{" "}
                  Yolo Score
                </p>
              </div>
            </div>

            {poiDetail?.reviews?.length > 0 &&
              poiDetail?.reviews.map((review: any) => (
                <div className="sm:w-[315px] mx-auto">
                  <div className="flex items-center gap-7">
                    <ImageComponent
                      src="/assets/images/mapview/user.svg"
                      fill
                      figClassName="h-10 w-10 flex-shrink-0"
                      className="w-full object-cover rounded-full"
                    />
                    <div className="">
                      <p className="text-[#202020] text-sm">
                        Prashant Kumar Singh
                      </p>
                      <p className="text-xs">Reviewed 45 restuarants</p>
                    </div>
                    <p className="flex text-[#007ACE] font-semibold text-xs gap-3.5 items-center">
                      4.5
                      <i className="icon-star1 text-[#DFB300]"></i>
                    </p>
                  </div>
                  <p className="text-xs text-[#5F5F5F] mt-3">
                    If you wanna take a break from Varanasi you find a great
                    location and hospitality in this rooftop in the heart of the
                    town. Food is really tasty and staff really great!
                  </p>
                  <div className="flex gap-2 w-full overflow-auto mt-3 AtScrollHide">
                    <ImageComponent
                      src="/assets/images/mapview/comment.png"
                      fill
                      figClassName="h-[60px] w-[70px] flex-shrink-0"
                      className="w-full object-cover rounded-lg"
                    />
                    <ImageComponent
                      src="/assets/images/mapview/comment.png"
                      fill
                      figClassName="h-[60px] w-[70px] flex-shrink-0"
                      className="w-full object-cover rounded-lg"
                    />
                    <ImageComponent
                      src="/assets/images/mapview/comment.png"
                      fill
                      figClassName="h-[60px] w-[70px] flex-shrink-0"
                      className="w-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <BasicModal
        hide={setGallery}
        show={gallery}
        iconClass="hidden"
        className="!rounded-[16px] "
      >
        <div className="lg:w-[850px] sm:w-[550px] w-[500px]  xs:w-[380px] xs1:w-[340px]    relative">
          <div
            className="h-[22px] w-[22px] flex-shrink-0 absolute top-3 right-3  z-50 flex justify-center items-center cursor-pointer rounded-full bg-white "
            onClick={() => setGallery(false)}
          >
            <i
              className="icon-cross text-[10px] cursor-pointer  text-black font-normal  flex-shrink-0"
              aria-hidden="true"
            />
          </div>
          <div className=" overflow-hidden ">
            <Swiper
              modules={[Navigation]}
              navigation={poiDetail?.images?.length > 1 ? true : false}
              style={{ position: "unset" }}
              className="AtSocialSlider  bg-white w-full h-full"
              spaceBetween={0}
              slidesPerView={1}
              breakpoints={{
                300: {
                  slidesPerView: 1,
                },
              }}
            >
              {poiDetail?.images?.length > 0 ? (
                poiDetail.images?.map((e: any, index: number) => (
                  <SwiperSlide key={index} className="relative">
                    <ImageComponent
                      src={generateCloudinaryImageUrl(e, 850, 600, 100, true)}
                      fill
                      // height={425.48}
                      // width={900}
                      figClassName="h-[600px] xs:h-[450px] w-full"
                      className="w-full object-cover"
                    />
                  </SwiperSlide>
                ))
              ) : (
                <ImageComponent
                  src={"/assets/images/placeholder.png"}
                  fill
                  // height={425.48}
                  // width={900}
                  figClassName="h-[170px]  w-full"
                  className="w-full  object-cover"
                />
              )}
            </Swiper>
          </div>
        </div>
      </BasicModal>
    </>
  );
};

export default DetailPopup;
