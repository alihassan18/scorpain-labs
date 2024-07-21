"use client";
import Link from "next/link";
import Input from "@/components/common/Forms/Input";
import Button from "@/components/common/Button";
import { useForm } from "react-hook-form";
import { ImageComponent } from "@/components/common";
import { Arrow } from "@/components/common/Icons";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMainStore } from "@/zustand/mainStore";
import Cookies from "js-cookie";
import authApi from "@/api/endpoints/auth";
import axiosInstance from "@/api/http";



const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const u: any = Cookies.get("user");
  let user: any;
  if (u !== undefined && u !== null) {
    try {
      user = JSON.parse(u);
    } catch (error) {
      console.error("Error parsing user JSON:", error);
    }
  }

  const onGoBack = () => {
    setIsLoading(true);
    try {
      Cookies.remove("access_token");
      Cookies.remove("user");
      Cookies.remove("remember_token");
      // window.location.reload()
      router.push("/");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async () => {
    try {
      axiosInstance.get(`/users/${user?._id}`).then((resp) => {
        if (resp?.data) {
          Cookies.set("user", JSON.stringify(resp.data));
          if (resp.data.active === true) {
            toast.success("Verifcation completed");
            router.push("/app/galleryview");
          }
        }
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <div className="min-h-screen py-10 pb-5 pt-8 flex justify-between items-center relative flex-col ">
      <ImageComponent
        src="/assets/images/auth/loginbg.png"
        fill
        figClassName="w-full h-full !absolute top-0"
        className="object-cover"
        alt=""
      />
      <Link href="/">
        <Button
          onClick={onGoBack}
          className="flex items-center gap-3 absolute right-14 xs:right-4 top-6"
          type="submit"
        >
          {isLoading ? "Loading.." : "Go Back"}
        </Button>
      </Link>

      <form className="w-full sm:w-[550px] sm:px-10 px-4 relative mt-24">
        <img src="/assets/images/logo.png" alt="" className="mx-auto w-[60%]" />
        <h1 className="text-center  text-secondary mt-14 xs:mt-8">
          <span className="text-4xl lg:text-[60px] font-semibold leading-0 ">
            Welcome
          </span>
          <span className="block text-[30px]">
            To The <span className="text-primary">Yolo Selection</span>
          </span>
        </h1>
        <p className="text-secondary text-center text-3xl mt-4 sm:mt-7">
          Your verification is pending ..
        </p>

        {/* {
                    isLoading ? <Button disabled
                        className="mt-2 sm:mt-4 w-full flex gap-2 sm:!py-6 !text-xl sm:!text-[22px]"
                        type="submit"
                    >
                        Loading...

                    </Button> : <Button
                        className="mt-2 sm:mt-4 w-full flex gap-2 sm:!py-6 !text-xl sm:!text-[22px]"
                        type="submit"
                    >
                        Logout Now
                        <span>
                            <Arrow />
                        </span>
                    </Button>
                } */}
      </form>
      <p className="relative text-[#ADADAD] text-base">
        © 2024 Yolo Selection. All rights reserved.
      </p>
    </div>
  );
};

export default Login;
