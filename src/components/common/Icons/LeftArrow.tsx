import { IconProps } from "@/interfaces/icon.interface";
import React from "react";

const LeftArrow = ({ className }: IconProps) => {
  return (
    <svg
      width="9"
      className={className || ""}
      height="16"
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.50003 14.6L2.0667 9.16666C1.42503 8.52499 1.42503 7.47499 2.0667 6.83333L7.50003 1.39999"
        stroke="#020120"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LeftArrow;
