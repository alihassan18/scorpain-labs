import React from "react";
import { IconProps } from "@/interfaces/icon.interface";

const Menue = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      width="16"
      height="10"
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.69238 1.61523H12.6924"
        stroke="#A4A4A4"
        strokeLinecap="round"
      />
      <path
        d="M2.69238 4.61523H12.6924"
        stroke="#A4A4A4"
        strokeLinecap="round"
      />
      <path
        d="M2.69238 7.61523H12.6924"
        stroke="#A4A4A4"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Menue;
