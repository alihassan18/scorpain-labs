"use client";
import { Button, Container } from "@/components/common";
import React, { useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import axios from "axios";
import { ApplyFormInputs } from "@/types";

// Define your Yup schema
const schema = yup
  .object({
    projectName: yup.string().required("Project Name is required"),
    website: yup
      .string()
      .url("Must be a valid URL")
      .required("Website is required"),
    companyName: yup.string().required("Company Name is required"),
    telegram: yup.string().required("Telegram is required"),
  })
  .required();

const Apply = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplyFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ApplyFormInputs> = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/query`,
        data
      );
      toast.success("Your application was submitted successfully!");
      reset();
      console.log(response.data);
    } catch (error) {
      toast.error(
        "There was an error submitting your application. Please try again."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="sm:py-[60px] py-[30px]" id="apply">
        <Container size="xl" className="flex justify-center">
          <div className="w-full max-w-[633.12px]">
            <h2 className="sm:text-[28px] text-2xl font-bold font-slussen text-center uppercase">
              Apply for Scorpian-labs MM Tool
            </h2>
            <p className="text-[20px] font-normal leading-tight font-slussen !text-[#56718D] text-center mt-5">
              Please fill in the info below, our sales manager will contact you!
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-[50px] space-y-3"
            >
              <div className="relative">
                <label
                  htmlFor="projectName"
                  className="absolute text-lg font-normal font-slussen top-[30%] left-[3%]"
                >
                  Project Name:
                </label>
                <input
                  id="projectName"
                  {...register("projectName")}
                  type="text"
                  placeholder="Please Enter"
                  className="w-full pl-44 py-6 placeholder:text-base border border-[#56718D80]/50 placeholder:font-slussen placeholder:font-normal"
                />
              </div>
              {errors.projectName && (
                <p className="text-red-500">{errors.projectName.message}</p>
              )}

              <div className="relative">
                <label
                  htmlFor="website"
                  className="absolute text-lg font-normal font-slussen top-[30%] left-[3%]"
                >
                  Website:
                </label>
                <input
                  id="website"
                  {...register("website")}
                  type="text"
                  placeholder="Please Enter"
                  className="w-full pl-44 py-6 placeholder:text-base border border-[#56718D80]/50 placeholder:font-slussen placeholder:font-normal"
                />
              </div>
              {errors.website && (
                <p className="text-red-500">{errors.website.message}</p>
              )}

              <div className="relative">
                <label
                  htmlFor="companyName"
                  className="absolute text-lg font-normal font-slussen top-[30%] left-[3%]"
                >
                  Company Name:
                </label>
                <input
                  id="companyName"
                  {...register("companyName")}
                  type="text"
                  placeholder="Please Enter"
                  className="w-full pl-44 py-6 placeholder:text-base border border-[#56718D80]/50 placeholder:font-slussen placeholder:font-normal"
                />
              </div>
              {errors.companyName && (
                <p className="text-red-500">{errors.companyName.message}</p>
              )}

              <div className="relative">
                <label
                  htmlFor="telegram"
                  className="absolute text-lg font-normal font-slussen top-[30%] left-[3%]"
                >
                  Telegram:
                </label>
                <input
                  id="telegram"
                  {...register("telegram")}
                  type="text"
                  placeholder="Please Enter"
                  className="w-full pl-44 py-6 placeholder:text-base border border-[#56718D80]/50 placeholder:font-slussen placeholder:font-normal"
                />
              </div>
              {errors.telegram && (
                <p className="text-red-500">{errors.telegram.message}</p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="bg-secondary !w-full mt-12 font-slussen font-normal whitespace-nowrap !text-2xl tracking-[0.34px] !text-black-100 flex items-center !py-2 !px-6 rounded-none gap-8"
              >
                {loading ? (
                  <span className="flex items-center">Loading...</span>
                ) : (
                  <>
                    Get Started Today <BsArrowUpRight className="text-sm" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Apply;
