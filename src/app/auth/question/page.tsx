"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, ImageComponent } from "@/components/common";
import Input from "@/components/common/Forms/Input";
import { IoIosArrowRoundForward } from "react-icons/io";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axiosInstance from "@/api/http";
import * as Cookies from "js-cookie";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const urlRegex =
  /^(https?:\/\/)?(([\w.-]+)\.([a-z]{2,6})|localhost)(:[0-9]{1,5})?(\/[\w-]*)*$/;

const schema = yup.object().shape({
  userName: yup.string().required("User Name is required"),
  facebookProfile: yup
    .string()
    .matches(urlRegex, "Enter a valid URL")
    .required("Facebook profile is required"),
  instagramProfile: yup
    .string()
    .matches(urlRegex, "Enter a valid URL")
    .required("Instagram profile is required"),
  whatsappNumber: yup.string().required("Phone number is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
});

export default function Index() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      whatsappNumber: "",
    },
    resolver: yupResolver(schema),
  });
  let phoneValue = watch("whatsappNumber");

  const cookiesUser = Cookies.default.get("user");

  let myUser: any;
  if (cookiesUser) {
    myUser = JSON.parse(cookiesUser);
  }

  const userId = myUser?._id;

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      // Submit form data

      const resp = await axiosInstance.post(
        `/auth/${userId}/questionnaire`,
        data
      );

      if (resp.data?.user?.active === true) {
        router.push("/app/galleryview");
      } else {
        router.push("/auth/pendingVerification");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit the form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen AtScrollHide">
      <ImageComponent
        src="/assets/images/auth/loginbg.png"
        fill
        figClassName="w-full h-full !absolute top-0"
        className="object-cover"
        alt=""
      />
      <div className="min-h-screen py-10 pb-5 pt-8 flex AtScrollHide relative flex-col max-w-[450px] mx-auto px-4">
        <ImageComponent
          src="/assets/images/logo.png"
          fill
          figClassName="w-[295px] h-[45px] mx-auto"
          className=""
          alt=""
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center items-start flex-col gap-3 mt-8"
        >
          <div className="w-full">
            <label htmlFor="userName" className="text-lg font-medium">
              <span className="bg-gradient-to-b from-[#8f4cdd] to-[#f2458b] inline-block text-transparent bg-clip-text">
                Q1.
              </span>
              Who invited you ?
            </label>
            <Input
              placeholder="Enter Name"
              register={register}
              name="userName"
              className="w-[500px] rounded-[20px] border-2 border-[#D0D0D080] !py-3"
            />
            {errors.userName && (
              <p className="text-red-500 text-xl">{errors.userName.message}</p>
            )}
          </div>

          <label htmlFor="facebookProfile" className="text-lg font-medium pt-3">
            <span className="bg-gradient-to-b from-[#8f4cdd] to-[#f2458b] inline-block text-transparent bg-clip-text">
              Q2.
            </span>
            What's your Facebook profile?
          </label>
          <Input
            placeholder="facebook.com/vishen"
            register={register}
            name="facebookProfile"
            className="w-[500px] rounded-[20px] border-2 border-[#D0D0D080] !py-3"
          />
          {errors.facebookProfile && (
            <p className="text-red-500 text-xl">
              {errors.facebookProfile.message}
            </p>
          )}
          <label htmlFor="instagramProfile" className="text-lg font-medium">
            <span className="bg-gradient-to-b from-[#8f4cdd] to-[#f2458b] inline-block text-transparent bg-clip-text">
              Q3.
            </span>
            What's your Instagram profile?
          </label>
          <Input
            placeholder="instagram.com/vishen"
            register={register}
            name="instagramProfile"
            className="rounded-[20px] border-2 border-[#D0D0D080] !py-3"
          />
          {errors.instagramProfile && (
            <p className="text-red-500 text-xl">
              {errors.instagramProfile.message}
            </p>
          )}
          <label htmlFor="whatsappNumber" className="text-lg font-medium">
            <span className="bg-gradient-to-b from-[#8f4cdd] to-[#f2458b] inline-block text-transparent bg-clip-text">
              Q4.
            </span>
            What's your WhatsApp number?
          </label>

          <PhoneInput
            country={"us"}
            placeholder="Enter phone number"
            value={phoneValue}
            inputClass="!w-full  !bg-transparent !border !rounded-[20px]  placeholder:text-[#505050] py-[26px] pl-4 border border-[#505050] rounded-lg placeholder:text-sm text-sm text-[#505050] focus:ring-0"
            onChange={(phone: any, country: any, e: any, formattedValue: any) =>
              setValue("whatsappNumber", formattedValue)
            }
          />
          {errors.whatsappNumber && <p className="text-red-500 text-xl">{errors.whatsappNumber.message}</p>}

          <label htmlFor="email" className="text-lg font-medium">
            <span className="bg-gradient-to-b from-[#8f4cdd] to-[#f2458b] inline-block text-transparent bg-clip-text">
              Q5.
            </span>
            What's your Email?
          </label>
          <Input
            type="email"
            placeholder="Enter Your Email"
            register={register}
            name="email"
            className="w-[500px] rounded-[20px] border-2 border-[#D0D0D080] !py-3"
          />
          {errors.email && (
            <p className="text-red-500 text-xl">{errors.email.message}</p>
          )}
          <label htmlFor="firstName" className="text-lg font-medium">
            <span className="bg-gradient-to-b from-[#8f4cdd] to-[#f2458b] inline-block text-transparent bg-clip-text">
              Q6.
            </span>
            What's your Name?
          </label>
          <Input
            type="text"
            placeholder="First name"
            register={register}
            name="firstName"
            className="w-[500px] rounded-[20px] border-2 border-[#D0D0D080] !py-3"
          />
          {errors.firstName && (
            <p className="text-red-500 text-xl">{errors.firstName.message}</p>
          )}
          <Input
            type="text"
            placeholder="Last Name"
            register={register}
            name="lastName"
            className="w-[500px] rounded-[20px] border-2 border-[#D0D0D080] !py-3"
          />
          {errors.lastName && (
            <p className="text-red-500 text-xl">{errors.lastName.message}</p>
          )}
          <Button
            type="submit"
            className="w-full mt-5 !py-2 font-medium !text-[22px]"
            disabled={loading}
          >
            {loading ? "Loading.." : "Submit"}
            <IoIosArrowRoundForward className=" !text-[40px]" />
          </Button>
        </form>
      </div>
    </div>
  );
}
