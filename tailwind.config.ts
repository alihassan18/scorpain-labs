import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-futura)", ...fontFamily.sans],
        inter: ["var(--font-inter)"],
        slussen: ['var(--font-slussen-mono)']
      },
      colors: {
        main: "#4169E1",
        secondary: "#FFD700",
        blue: {
          dark: "#0A2540"
        },
        yellow: {
          700: "#FFD700"
        },
        black: {
          DEFAULT: "#000000",
          mid: "#27292E",
          dull: "#1D2024",
          dark: "#161522",
          100: "#112121",
          200: "#2C2F36",
          400: "#46484E"
        },
        green: {
          200: "#29AF27",
          400: "#4AFF33"
        },
        orange: {
          dark: '#FFB16A'
        },
        red: {
          dark: "#FF0000",
          dull: "#FF3838"
        },
        primary: "#FFB82F",
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
      boxShadow: {
        arround: 'rgba(255, 255, 255, 0.02) 0px 5px 15px'
      },
      lineHeight: {
        0: "0",
      },
      backgroundImage: {
        banner: "url('/assets/images/landing-page/banner-bg.png')",
        mission: "url('/assets/images/landing-page/our-middion-bg.svg')",
        'mission-mobile ': "url('/assets/images/landing-page/liquidity-mobile.svg')",
        'custom-gradient': 'linear-gradient(to top, rgba(117, 33, 33, 0), rgba(117, 33, 33, 0.02))',
        'custom-gradient2': 'linear-gradient(to top, rgba(117, 33, 33, 0.02), rgba(117, 33, 33, 0))',
        'custom-gradient3': 'linear-gradient(to top, rgba(117, 33, 33, 0), rgba(117, 33, 33, 0.03))',
        'custom-gradient4': 'linear-gradient(to top, rgba(117, 33, 33, 0.03), rgba(117, 33, 33, 0))',
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
