import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nexa: {
          bg: "#0a0a0a",
          card: "#141414",
          border: "#1f1f1f",
          neon: "#00ff9d",
          pink: "#ff2d95",
          cyan: "#00e5ff",
        },
      },
      boxShadow: {
        neo: "4px 4px 0px 0px #00ff9d",
        "neo-pink": "4px 4px 0px 0px #ff2d95",
        "neo-hard": "6px 6px 0px 0px #000000",
        "neo-cyan": "4px 4px 0px 0px #00e5ff",
      },
      borderRadius: {
        neo: "12px",
      },
    },
  },
  plugins: [],
};
export default config;
