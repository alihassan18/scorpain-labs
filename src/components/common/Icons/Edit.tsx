import { IconProps } from "@/interfaces/icon.interface";

const Edit = ({ className }: IconProps) => {
  return (
    <svg
    className ={className }
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 5H3C2.46957 5 1.96086 5.21071 1.58579 5.58579C1.21071 5.96086 1 6.46957 1 7V16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H12C12.5304 18 13.0391 17.7893 13.4142 17.4142C13.7893 17.0391 14 16.5304 14 16V15"
        stroke="url(#paint0_linear_2090_14580)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 3.00011L16 6.00011M17.385 4.58511C17.7788 4.19126 18.0001 3.65709 18.0001 3.10011C18.0001 2.54312 17.7788 2.00895 17.385 1.61511C16.9912 1.22126 16.457 1 15.9 1C15.343 1 14.8088 1.22126 14.415 1.61511L6 10.0001V13.0001H9L17.385 4.58511Z"
        stroke="url(#paint1_linear_2090_14580)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2090_14580"
          x1="1"
          y1="5"
          x2="15.2683"
          y2="6.58537"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#3396F1" />
          <stop offset="1" stop-color="#7F4DEA" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2090_14580"
          x1="6"
          y1="1"
          x2="19.1708"
          y2="2.46343"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#3396F1" />
          <stop offset="1" stop-color="#7F4DEA" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Edit;
