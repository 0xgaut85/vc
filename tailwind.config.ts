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
        ascentis: "#16CABD",
        gold: "#C7A86A"
      },
      fontFamily: {
        'playfair': ['var(--font-playfair)', 'serif'],
        'inter': ['var(--font-inter)', 'sans-serif'],
        sans: ['var(--font-inter)', "ui-sans-serif", "system-ui", "Inter", "Avenir", "Helvetica", "Arial", "sans-serif"],
        serif: ['var(--font-playfair)', "ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"]
      },
      boxShadow: {
        glow: "0 0 24px rgba(46,111,255,.15)"
      }
    },
  },
  plugins: [],
};
export default config;
