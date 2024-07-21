"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Input from "@/components/common/Forms/Input";
import ImageComponent from "@/components/common/ImageComponent/index";
import { Button } from "@/components/common/index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ForgotSchema } from "@/utils/schema";
import { toast } from "react-toastify";
import CodeVerification from "../components/CodeVerification";
import NewPassword from "../components/NewPassword";
import { Arrow } from "@/components/common/Icons";
import InputError from "@/components/common/Forms/InputError";
import authApi from "@/api/endpoints/auth";
import AOS from "aos";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const [screen, setScreen] = useState(1);
  const [code, setCode] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ForgotSchema),
  });

  const onSubmit = async ({ email }: { email: string }) => {
    setEmail(email);

    const data = { email: email };
    setisLoading(true);
    try {
      const response = await authApi.forgetPasswordEndpoint(data);
      if (response.status != 200) {
        toast.error("Somthing went wrong");
        return;
      }
      setScreen(2);
      const token = response.data.data.token;

      localStorage.setItem("token", token);
      toast.success("Verification OTP sent to your email!");
    } catch (error) {
    } finally {
      setisLoading(false);
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

  return (
    <div className="min-h-screen py-10 pb-5  pt-8 px-4 flex justify-between items-center relative flex-col">
      <ImageComponent
        src="/assets/images/auth/loginbg.png"
        fill
        figClassName="w-full h-full   !absolute top-0 -z-20"
        className="object-cover"
        alt=""
      />
      <img
        src="/assets/images/logo.png"
        alt=""
        className="mx-auto w-[50%] hidden flex-shrink-0 xs:block relative z-20"
      />
      <div
        className={`w-full sm:w-[550px] sm:px-10 px-4 relative mt-24 xs:mt-0  xs:bg-white xs:shadow-xl  xs:rounded-[20px] xs:p-6 `}
        data-aos="fade-up"
      >
        <img
          src="/assets/images/logo.png"
          alt=""
          className="mx-auto w-[50%]  xs:hidden block  flex-shrink-0 2xl:w-[60%]"
        />
        {screen == 1 ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-center text-4xl 2xl:text-[40px] xs:text-[30px] xs:mt-0 mt-4 2xl:mt-8 font-semibold">
              Confirm Your Email
            </h2>
            <div className="mt-5 2xl:mt-10">
              <Input
                placeholder="Enter email"
                name="email"
                register={register}
              />
              <InputError error={errors.email?.message} />
            </div>

            {isLoading ? (
              <Button
                disabled
                className="mt-5 w-full flex gap-2 2xl:!py-6 !text-xl 2xl:!text-[22px]"
                type="submit"
              >
                Loading...
              </Button>
            ) : (
              <div className=" xs:flex xs:justify-center items-center ">
                <Button
                  className="mt-5 w-full flex gap-2 2xl:!py-6  py-3 xs:!text-sm !text-xl 2xl:!text-[22px] xs:w-[215px]"
                  type="submit"
                >
                  SEND ME CODE
                  <span>
                    <Arrow className="xs:h-3 xs:w-3" />
                  </span>
                </Button>
              </div>
            )}
          </form>
        ) : screen == 2 ? (
          <CodeVerification
            email={email}
            setScreen={setScreen}
            setCode={setCode}
          />
        ) : (
          <NewPassword email={email} setScreen={setScreen} code={code} />
        )}
      </div>
      <p className="text-[#ADADAD] xs:text-secondary xs:text-sm text-base">
        © 2024 Yolo Selection. All rights reserved.
      </p>
    </div>
  );
};

export default ForgotPassword;
