"use client";
import Link from "next/link";
import Input from "@/components/common/Forms/Input";
import Button from "@/components/common/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputError from "@/components/common/Forms/InputError";
import { LoginSchema } from "@/utils/schema";
import { Container, ImageComponent } from "@/components/common";
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
import { BsArrowUpRight } from "react-icons/bs";
import Image from "next/image";

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
      console.log(response);

      if (response?.data?.access_token) {
        localStorage.setItem("user", JSON.stringify(response?.data?.record));
        dispatch(updateUser(response.data.record));
        appStore.setUser(response.data.record);
        appStore.setAccessToken(response.data.access_token);
        Cookies.default.set("access_token", response?.data?.access_token);
        router.push("/profile/account-overview");
      } else {
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
      <div className="md:py-20 py-5 bg-main relative">
        <Container
          size="xl"
          className="grid md:grid-cols-2 grid-cols-1 items-center gap-10"
        >
          <div className="sm:block hidden">
            <Image
              src="/assets/images/login/login-banner.svg"
              alt="login banner"
              height={652}
              width={630}
            />
          </div>
          <div className="flex justify-center sm:px-0 sm:py-0 py-10 px-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full sm:w-[409px] shadow-arround relative rounded-lg"
            >
              <h2 className="font-bold text-white text-[28px] leading-[36.68px] font-slussen">
                Login
              </h2>
              <p className="font-slussen sm:text-xl text-base sm:mt-0 mt-4   font-normal leading-[26.2px] tracking-[0.34px] text-[#F6F9FCE5]/90">
                See what is going on with your business
              </p>
              <div
                className="xs:shadow-xl  xs:rounded-[20px] mt-8 xs:p-6"
                data-aos="fade-up"
              >
                <div className="spae-y-1">
                  <label
                    htmlFor=""
                    className="text-white font-slussen font-semibold text-sm mb-2"
                  >
                    Email
                  </label>
                  <Input
                    placeholder="Email Address"
                    name="email"
                    register={register}
                    // AddIcon={<EmailIcon />}
                    className="text-white border-white rounded-none placeholder:text-white font-slussen"
                  />
                  <InputError error={errors.email?.message} />
                </div>
                <div className="mt-4 2xl:mt-6 space-y-1">
                  <label
                    htmlFor=""
                    className="text-white font-slussen font-semibold text-sm mb-2"
                  >
                    Password
                  </label>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    className="text-white border-white rounded-none placeholder:text-white font-slussen"
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
                  <div className=" xs:flex xs:justify-center items-center ">
                    <Button
                      disabled={isLoading}
                      className="bg-secondary mt-10 w-full font-slussen whitespace-nowrap !text-2xl tracking-[0.34px] !text-black-100 flex items-center !py-2 !px-6 rounded-none gap-8  xs:w-[215px]"
                      type="submit"
                    >
                      {isLoading ? "Loading..." : "Login"}
                      <span>
                        <BsArrowUpRight className="text-sm" />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Login;
