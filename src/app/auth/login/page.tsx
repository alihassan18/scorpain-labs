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
            console.log("i got here.");
            router.push("/");
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
      <div className="md:py-20 bg-black-dull border-b py-10 pb-5 pt-8 flex justify-between items-center relative flex-col">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full sm:w-[500px] p-10 relative rounded-lg  shadow-arround"
        >
          <img
            src="/assets/images/logo.png"
            alt=""
            className="mx-auto w-[50%] xs:hidden block 2xl:w-[60%]"
          />
          <div
            className="xs:shadow-xl xs:bg-white xs:rounded-[20px] md:mt-16 mt-8 xs:p-6"
            data-aos="fade-up"
          >
            <div className="mt-2 sm:mt-4 spae-y-1">
              <label htmlFor="" className="text-white">
                Email
              </label>
              <Input
                placeholder="Email Address"
                name="email"
                register={register}
                // AddIcon={<EmailIcon />}
                className="text-white"
              />
              <InputError error={errors.email?.message} />
            </div>
            <div className="mt-4 2xl:mt-6 space-y-1">
              <label htmlFor="" className="text-white">
                Password
              </label>
              <Input
                placeholder="Password"
                type="password"
                name="password"
                className="text-white"
                register={register}
                // AddIcon={<PasswordIcon />}
              />
              <InputError error={errors.password?.message} />
            </div>
            {/* <div className="flex mt-2 ml-2">
              <Link href="/auth/forgot-password">
                <p className="cursor-pointer text-base xs:text-xs font-medium underline text-royalBlue">
                  Forgot Password?
                </p>
              </Link>
            </div> */}
            <div className="pt-4">
              {isLoading ? (
                <Button
                  disabled
                  className="mt-2 2xl:mt-4 rounded-md w-full bg-primary flex gap-2 2xl:!py-4 !text-xl 2xl:!text-[22px] xs:!text-sm"
                  type="submit"
                >
                  Loading...
                </Button>
              ) : (
                <div className=" xs:flex xs:justify-center items-center ">
                  <Button
                    className="mt-2 2xl:mt-4 rounded-md w-full bg-primary flex gap-2 2xl:!py-4 xs:!text-sm !text-xl 2xl:!text-[22px] xs:w-[215px]"
                    type="submit"
                  >
                    Login Now
                    <span>
                      <Arrow className="xs:h-3 xs:w-3" />
                    </span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
