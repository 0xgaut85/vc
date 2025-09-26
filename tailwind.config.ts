import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B0E14",
        slate: "#141A23",
        fog: "#F5F7FA",
        apex: "#2E6FFF",
        summit: "#16CABD",
        gold: "#C7A86A"
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Inter", "Avenir", "Helvetica", "Arial", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 24px rgba(46,111,255,.15)"
      }
    },
  },
  plugins: [],
};
export default config;
