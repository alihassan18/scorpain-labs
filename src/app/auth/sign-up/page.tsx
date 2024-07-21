"use client";
import Link from "next/link";
import Input from "@/components/common/Forms/Input";
import Button from "@/components/common/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputError from "@/components/common/Forms/InputError";
import { SignUpSchema } from "@/utils/schema";
import { Arrow } from "@/components/common/Icons";
import { useEffect, useState } from "react";
import { ImageComponent } from "@/components/common";
import { toast } from "react-toastify";
import { useSearchParams, useRouter } from "next/navigation";
import authApi from "@/api/endpoints/auth";
import { useMainStore } from "@/zustand/mainStore";
import AOS from "aos";

interface FormData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  inviteId?: string;
}

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setisLoading] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(SignUpSchema),
  });

  const appStore = useMainStore();

  const onSubmit: SubmitHandler<FormData> = async () => {
    setisLoading(true);
    let data: FormData = {
      first_name: getValues("first_name"),
      last_name: getValues("last_name"),
      email: getValues("email"),
      password: getValues("password"),
    };

    const inviteId = searchParams.get("inviteId");
    if (inviteId) data.inviteId = inviteId as string;

    try {
      const response = await authApi.registerEndpoint(data);

      if (response.data?.access_token && response.data.record) {
        toast.success("Verification OTP sent to your email!");
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("user", JSON.stringify(response.data.record));
        router.push("/auth/signupEmailVerify");
        appStore.setUser(response.data.record);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
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
    <>
      <meta charSet="UTF-8" />
      <meta
        name="title"
        content="Join Yolo Selection: Your Personalized Travel Community"
      />
      <title>Join Yolo Selection: Your Personalized Travel Community</title>
      <meta
        name="description"
        content="Travel differently with Yolo Selection. Sign up to discover hidden gems, collaborate with friends & follow influencers for unique travel experiences. "
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
        content="Join Yolo Selection: Your Personalized Travel Community"
      />
      <meta
        property="og:description"
        content="Travel differently with Yolo Selection. Sign up to discover hidden gems, collaborate with friends & follow influencers for unique travel experiences. "
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
        content="Join Yolo Selection: Your Personalized Travel Community"
      />
      <meta
        name="twitter:description"
        content="Travel differently with Yolo Selection. Sign up to discover hidden gems, collaborate with friends & follow influencers for unique travel experiences.      "
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
            className=" xs:bg-white xs:shadow-xl  xs:rounded-[20px] xs:p-6"
            data-aos="fade-up"
          >
            <h1 className="text-center  text-secondary mt-12 xs:mt-0 2xl:mt-16">
              <span className="text-6xl 2xl:text-[80px] xs:text-[30px] font-semibold leading-0 ">
                Welcome
              </span>
              <span className="block text-2xl 2xl:text-[30px]  mt-4 xs:mt-0 xs:text-lg">
                To The <span className="text-primary">Yolo Selection</span>
              </span>
            </h1>
            {/* <p className="text-secondary text-center text-[22px] mt-4 sm:mt-7">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p> */}

            <>
              <div className="gap-3 sm:flex mt-2 sm:mt-4">
                <div className=" sm:w-1/2">
                  <Input
                    placeholder="First Name*"
                    name="first_name"
                    type="text"
                    register={register}
                  />
                  <InputError error={errors.first_name?.message} />
                </div>
                <div className="sm:w-1/2">
                  <Input
                    placeholder="Last Name*"
                    name="last_name"
                    type="text"
                    register={register}
                  />
                  <InputError error={errors.last_name?.message} />
                </div>
              </div>
              <div className="mt-2 2xl:mt-4">
                <Input
                  placeholder="Email Address"
                  name="email"
                  register={register}
                  // AddIcon={<EmailIcon />}
                />
                <InputError error={errors.email?.message} />
              </div>
              <div className="mt-2 2xl:mt-4">
                <Input
                  placeholder="Password*"
                  type="password"
                  name="password"
                  register={register}
                />
                <InputError error={errors.password?.message} />
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
                    Signup Now
                    <span>
                      <Arrow className="xs:h-3 xs:w-3" />
                    </span>
                  </Button>
                </div>
              )}
            </>

            <p className="text-base text-center mt-2 xs:text-sm xs:text-[#333333]">
              I already have an account.{" "}
              <Link href="/auth/login">
                <span className="text-base xs:text-xs  font-medium underline text-royalBlue">
                  Login Here
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
