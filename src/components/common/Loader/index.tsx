import React from "react";
import { ImSpinner9 } from "react-icons/im";
const Loader = () => {
  return (
    <div className="absolute items-center flex justify-center h-[calc(100vh-150px)] sm:w-[calc(100vw-150px)] top-[150px] z-40">
      <ImSpinner9 className={"animate-spin text-4xl text-[#7557EB]"} />
    </div>
  );
};

export default Loader;
