import React, { Fragment } from "react";
import { Container } from "@/components/common";

const AccountOverview: React.FC = () => {
  return (
    <Fragment>
      <div className="md:py-20 min-h-[100vh] py-10 bg-black-dull border-b">
        <Container className="flex justify-center">
          <div className="p-10 bg-black-400 w-full max-w-[800px] flex flex-col items-center rounded-lg">
            <h1 className="text-4xl textGradient font-semibold mb-12">
              Account Overview
            </h1>
            <section className="w-full space-y-5"></section>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default AccountOverview;
