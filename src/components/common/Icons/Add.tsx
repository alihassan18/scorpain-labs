import { IconProps } from "@/interfaces/icon.interface";

const Add = ({ className }: IconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z"
        fill="url(#paint0_linear_2269_2693)"
      />
      <path
        d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V18C12.75 18.41 12.41 18.75 12 18.75Z"
        fill="url(#paint1_linear_2269_2693)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2269_2693"
          x1="5.25"
          y1="11.25"
          x2="12.75"
          y2="18.75"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#3396F1" />
          <stop offset="1" stop-color="#7F4DEA" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2269_2693"
          x1="11.25"
          y1="5.25"
          x2="12.9164"
          y2="5.27057"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#3396F1" />
          <stop offset="1" stop-color="#7F4DEA" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Add;
