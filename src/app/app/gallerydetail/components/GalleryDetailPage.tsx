import React, { useEffect, useState } from "react";
import Rightsidebar from "../components/RightSidebar";
import Leftsidebar from "../components/LeftSidebar";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";
import axiosInstance from "@/api/http";

const GalleryDetailPage = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const [poi, setPoi] = useState({});

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        // `https://api.airtable.com/v0/app9oTAofFFlsONXo/tbloYhLsZcX0OBHps/${id}`,
        `/poi/${id}`
      );

      // const newData = response.data.fields;
      const newData = response.data;


      setPoi(newData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <div className="absolute w-full  items-center top-0 flex justify-center h-full">
        <ImSpinner9 className={"animate-spin text-2xl text-[#7557EB]"} />
      </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-8 lg:gap-6 bg-white mt-6">
          <div className="lg:col-span-5">
            <Leftsidebar poi={poi} />
          </div>
          <div className="lg:col-span-3 lg:space-y-4">
            <Rightsidebar poi={poi} />
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryDetailPage;
