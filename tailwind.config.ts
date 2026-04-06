import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        f6f6f6: "#F6F6F6",
      },
      borderWidth: {
        "2": "2px",
      },
      colors: {
        "custom-blue": "#1F8DF5",
        primary: "#000000",
        accent: "#6b2a23", // optional lighter/darker shade
      },
      width: {
        textInputWidth: "46%",
      },
      fontFamily: {
        nunito: ["var(--font-nunito)", "sans-serif"],
      },
    },
  },
  plugins: [nextui()],
};
export default config;
