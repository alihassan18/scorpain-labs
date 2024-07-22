import React, { Fragment } from "react";
import { Container } from "@/components/common";
import VolumeSupport from "./_components/VolumeSupport";
import LiquiditySupport from "./_components/LiquiditySupport";
import ManualOperation from "./_components/ManualOperation";
import VipServices from "./_components/VipServices";

const Profile: React.FC = () => {
  return (
    <Fragment>
      <div className="bg-black-dull border-b py-10">
        <Container className="space-y-5">
          <h1 className="text-4xl text-white font-semibold">Basic Services</h1>
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
