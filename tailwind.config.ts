import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        assistant: ["var(--font-assistant)"],
        // mono: ['var(--font-roboto-mono)'],
      },
      colors: {
        secondaryBg: "var(--m-secondary-bg-color)",
        secondary: "var(--m-secondary-color)",
        borderColor: "var(--m-border-color)",
        mainLightColor: "var(--m-main-light-color)",
      },
    },
  },
  plugins: [],
};
export default config;
