import { Container } from "@/components/common";
import Input from "@/components/common/Forms/Input";
import React, { Fragment } from "react";

const ChangePassword: React.FC = () => {
  return (
    <Fragment>
      <div className="md:py-20 py-10 bg-[#16234B] border-b min-h-[100vh]">
        <Container className="flex justify-center">
          <div className="sm:p-10 px-4 py-10   bg-[#1E3372] w-full max-w-[600px] flex flex-col items-center rounded-lg">
            <h1 className="text-4xl font-slussen textGradient font-semibold mb-12">
              Change Password
            </h1>
            <section className="w-full space-y-5">
              <div className="grid md:grid-cols-4 gap-3 w-full items-center">
                <p className="text-white font-slussen text-sm">Old Password:</p>
                <div className="col-span-3">
                  <Input
                    className="bg-[#31488E] font-slussen text-white w-full"
                    placeholder={""}
                    type="password"
                    name="password"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-3 w-full items-center">
                <p className="text-white font-slussen text-sm">New Password:</p>
                <div className="col-span-3">
                  <Input
                    className="bg-[#31488E] font-slussen text-white w-full"
                    placeholder={""}
                    type="password"
                    name="password"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-3  w-full items-center">
                <p className="text-white font-slussen text-sm">
                  Confirm Password:
                </p>
                <div className="col-span-3">
                  <Input
                    className="bg-[#31488E] font-slussen text-white w-full"
                    placeholder={""}
                    type="password"
                    name="password"
                  />
                </div>
              </div>
            </section>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default ChangePassword;
