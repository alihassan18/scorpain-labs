"use client";
import React, { useState } from "react";
import Input from "@/components/common/Forms/Input";
import { Button } from "@/components/common/index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPasswordSchema } from "@/utils/schema";
import { toast } from "react-toastify";
import InputError from "@/components/common/Forms/InputError";
import { useRouter } from "next/navigation";
import { Arrow } from "@/components/common/Icons";
import authApi from "@/api/endpoints/auth";

interface IProps {
  email: string;
  code: string;
  setScreen(state: number): void;
}
interface FormData {
  password: string;
  confirmPassword: string;
}

const NewPassword = ({ setScreen, email, code }: IProps) => {
  const [isLoading, setisLoading] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ResetPasswordSchema),
  });
  const token = localStorage.getItem("token");

  const onSubmit = async (data: FormData) => {
    const paylode: any = { password: data.password, token: token };
    setisLoading(true);
    try {
      const response = await authApi.resetPasswordEndPoint(paylode);
      if (response.status != 200) {
        toast.error("Somthing went wrong");
        return;
      }
      router.push("/auth/login");
      toast.success("Password changed successfully");
    } catch (error) {
    } finally {
      setisLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center">
        <h2 className="text-center text-4xl 2xl:text-[40px] mt-4 2xl:mt-8 font-semibold xs:text-[30px] xs:mt-0">
          Create New Password
        </h2>
      </div>
      <div className="mt-5 2xl:mt-10">
        <Input
          placeholder="New Password*"
          type="password"
          name="password"
          register={register}
        />
        <InputError error={errors.password?.message} />
      </div>
      <div className="mt-3 2xl:mt-5">
        <Input
          placeholder="Confirm New Password*"
          name="confirmPassword"
          type="password"
          register={register}
        />
        <InputError error={errors.confirmPassword?.message} />
      </div>

      <div className=" xs:flex xs:justify-center items-center ">
        <Button
          className="2xl:mt-7 mt-5 w-full flex gap-2 2xl:!py-6 flex-shrink-0  py-3 xs:!text-sm !text-xl 2xl:!text-[22px] xs:!min-w-[215px]"
          type="submit"
        >
          {isLoading ? "Loading..." : "CREATE NEW PASSWORD"}
          {!isLoading ? (
            <span>
              <Arrow className="xs:h-3 xs:w-3" />
            </span>
          ) : (
            ""
          )}
        </Button>
      </div>
    </form>
  );
};

export default NewPassword;
