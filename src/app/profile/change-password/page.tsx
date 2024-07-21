import { Container } from "@/components/common";
import Input from "@/components/common/Forms/Input";
import React, { Fragment } from "react";

const ChangePassword: React.FC = () => {
  return (
    <Fragment>
      <div className="md:py-20 py-10 bg-black-dull border-b min-h-[90vh]">
        <Container className="flex justify-center">
          <div className="p-10 bg-black-400 w-full max-w-[600px] flex flex-col items-center rounded-lg">
            <h1 className="text-4xl textGradient font-semibold mb-12">
              Change Password
            </h1>
            <section className="w-full space-y-5">
              <div className="grid grid-cols-4 w-full items-center">
                <p className="text-white text-base">Old Password:</p>
                <div className="col-span-3">
                  <Input
                    className="bg-black-mid text-white w-full"
                    placeholder={"Select"}
                    type="password"
                    name="password"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 w-full items-center">
                <p className="text-white text-base">New Password:</p>
                <div className="col-span-3">
                  <Input
                    className="bg-black-mid text-white w-full"
                    placeholder={"Select"}
                    type="password"
                    name="password"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 w-full items-center">
                <p className="text-white text-base">Confirm Password:</p>
                <div className="col-span-3">
                  <Input
                    className="bg-black-mid text-white w-full"
                    placeholder={"Select"}
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
