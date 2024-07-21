import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-futura)", ...fontFamily.sans],
      },
      colors: {
        primary: "#FF4581",
        secondary: "#333333",
        darkBlack: "#001D41",
        lightGray: "#8F9091",
        slate: "#E9E9E9",
        royalBlue: "#3396F1",
        borderColor: "#BCBBDC",
      },
      screens: {
        xs: { min: "300px", max: "540px" },
        xs1: { min: "300px", max: "400px" },
        md1: { min: "600px", max: "766px" },
        sm2: { min: "300px", max: "660px" },
      },
      borderRadius: {
        larg: "20px",
      },
      lineHeight: {
        0: "0",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
