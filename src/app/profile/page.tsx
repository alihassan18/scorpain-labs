import React, { Fragment } from "react";
import { Container } from "@/components/common";
import VolumeSupport from "./_components/VolumeSupport";
import LiquiditySupport from "./_components/LiquiditySupport";
import ManualOperation from "./_components/ManualOperation";
import VipServices from "./_components/VipServices";

const Profile: React.FC = () => {
  return (
    <Fragment>
      <div className="bg-main border-b py-10">
        <Container size="xl" className="space-y-5">
          <h1 className="text-4xl font-slussen text-white font-bold">
            Basic Services
          </h1>
          <VolumeSupport />
          <LiquiditySupport />
          <ManualOperation />
          <VipServices />
        </Container>
      </div>
    </Fragment>
  );
};

export default Profile;
