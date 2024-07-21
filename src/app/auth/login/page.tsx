"use client";
import Link from "next/link";
import Input from "@/components/common/Forms/Input";
import Button from "@/components/common/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputError from "@/components/common/Forms/InputError";
import { LoginSchema } from "@/utils/schema";
import { ImageComponent } from "@/components/common";
import { Arrow } from "@/components/common/Icons";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import authApi from "@/api/endpoints/auth";
import { useMainStore } from "@/zustand/mainStore";
import AOS from "aos";
import * as Cookies from "js-cookie";

import { useDispatch } from "react-redux";
import { updateUser } from "@/redux/slice/user";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const appStore = useMainStore();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async () => {
    setIsLoading(true);

    let data = {
      email: getValues("email"),
      password: getValues("password"),
    };
    try {
      const response = await authApi.loginEndpoint(data);
      localStorage.setItem("user", JSON.stringify(response?.data?.record));
      console.log(response, "response from login endpoint");
      if (response?.data) {
        dispatch(updateUser(response.data.record));
      }


      console.log(response, "login res");

      switch (true) {
        case response.data?.access_token &&
          response.data?.record &&
          response.data?.record?.isVerifiedOtp === true:
          // toast.success('User login successfully');
          appStore.setUser(response.data.record);
          appStore.setAccessToken(response.data.access_token);
          if (
            response.data.record.active === true &&
            response?.data?.record?.Questionnaire?.length !== 0
          ) {
            Cookies.default.set("access_token", response?.data?.access_token);
            console.log('i got here.')
            router.push("/app/galleryview");
          } else {
            router.push("/auth/pendingVerification");
          }

          if (response?.data?.record?.Questionnaire?.length === 0) {
            router.push("/auth/question");
          }
          break;
        case response.data?.record?.isVerifiedOtp === false:
          toast.success("Verification OTP sent to your email!");
          setTimeout(() => {
            router.push("/auth/signupEmailVerify");
          }, 2000);
          break;
        default:
          toast.error(response.data.message);
          return;
      }
    } catch (error: any) {
      toast.error(error);
      console.log("Error In Login", error);
    } finally {
      setIsLoading(false);
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
    <>
      <meta charSet="UTF-8" />
      <meta
        name="title"
        content="Login to Yolo Selection: Unlock Personalized Travel Recommendations"
      />
      <title>
        Login to Yolo Selection: Unlock Personalized Travel Recommendations
      </title>
      <meta
        name="description"
        content="Your travel crew awaits! Login to Yolo Selection and explore the world with personalized recommendations from friends & travel influencers."
      />
      <meta
        name="keywords"
        content="Personalized travel recommendations, Travel recommendations from friends, Travel recommendations from influencers, Travel social network, Hidden gem travel destinations, Friend-based travel planning, Influencer travel recommendations, Personalized travel app, Travel inspiration, Unique travel experiences"
      />
      <link rel="canonical" href="https://artofyolo-staging.vercel.app/" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Yolo Selection" />
      <meta
        property="og:title"
        content="Login to Yolo Selection: Unlock Personalized Travel Recommendations"
      />
      <meta
        property="og:description"
        content="Your travel crew awaits! Login to Yolo Selection and explore the world with personalized recommendations from friends & travel influencers."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://artofyolo-staging.vercel.app/" />
      <meta property="og:image" content="/assets/images/artofyolo.png" />
      {/* <meta property="og:image:secure_url" content="URL_TO_SECURE_IMAGE" /> */}
      <meta
        name="twitter:url"
        content="https://artofyolo-staging.vercel.app/"
      />
      <meta
        name="twitter:title"
        content="Login to Yolo Selection: Unlock Personalized Travel Recommendations"
      />
      <meta
        name="twitter:description"
        content="Your travel crew awaits! Login to Yolo Selection and explore the world with personalized recommendations from friends & travel influencers. "
      />
      <meta name="twitter:image" content="/assets/images/artofyolo.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image:alt" content="Yolo Selection" />
      <div className="min-h-screen py-10 pb-5 pt-8 flex justify-between items-center relative flex-col">
        <ImageComponent
          src="/assets/images/auth/loginbg.png"
          fill
          figClassName="w-full h-full !absolute top-0"
          className="object-cover"
          alt=""
        />

        <img
          src="/assets/images/logo.png"
          alt=""
          className="mx-auto w-[50%] hidden xs:block relative z-20"
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full sm:w-[550px] sm:px-10 px-4 relative"
        >
          <img
            src="/assets/images/logo.png"
            alt=""
            className="mx-auto w-[50%] xs:hidden block 2xl:w-[60%]"
          />
          <div
            className="  xs:shadow-xl  xs:bg-white xs:rounded-[20px] xs:p-6"
            data-aos="fade-up"
          >
            <h1 className="text-center  text-secondary mt-12 xs:mt-0 2xl:mt-16">
              <span className="text-6xl 2xl:text-[80px] xs:text-[30px] font-semibold leading-0 ">
                Welcome
              </span>
              <span className="block text-2xl 2xl:text-[30px] mt-4 xs:mt-0 xs:text-lg">
                To The <span className="text-primary">Yolo Selection</span>
              </span>
            </h1>
            <div className="mt-2 sm:mt-4">
              <Input
                placeholder="Email Address"
                name="email"
                register={register}
                // AddIcon={<EmailIcon />}
                className=""
              />
              <InputError error={errors.email?.message} />
            </div>
            <div className="mt-4 2xl:mt-7">
              <Input
                placeholder="Password"
                type="password"
                name="password"
                register={register}
                // AddIcon={<PasswordIcon />}
              />
              <InputError error={errors.password?.message} />
            </div>
            <div className="flex mt-2 ml-2">
              <Link href="/auth/forgot-password">
                <p className="cursor-pointer text-base xs:text-xs font-medium underline text-royalBlue">
                  Forgot Password?
                </p>
              </Link>
            </div>
            {isLoading ? (
              <Button
                disabled
                className="mt-2 2xl:mt-4 w-full flex gap-2 2xl:!py-6 !text-xl 2xl:!text-[22px] xs:!text-sm"
                type="submit"
              >
                Loading...
              </Button>
            ) : (
              <div className=" xs:flex xs:justify-center items-center ">
                <Button
                  className="mt-2 2xl:mt-4 w-full   flex gap-2 2xl:!py-6  py-3 xs:!text-sm !text-xl 2xl:!text-[22px] xs:w-[215px]"
                  type="submit"
                >
                  Login Now
                  <span>
                    <Arrow className="xs:h-3 xs:w-3" />
                  </span>
                </Button>
              </div>
            )}
            <p className="text-base text-center mt-2 xs:text-sm xs:text-[#333333]">
              I don’t have an account.{" "}
              <Link href="/auth/sign-up">
                <span className="text-base xs:text-xs  font-medium underline text-royalBlue">
                  Signup Here
                </span>
              </Link>
            </p>
          </div>
        </form>
        <p className="relative text-[#ADADAD] xs:text-secondary xs:text-sm text-base">
          © 2024 Yolo Selection. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Login;
