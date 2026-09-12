import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFFDF8",
        sand: "#F4EBDD",
        sun: "#E9A83A",
        terracotta: "#C96F4A",
        sea: "#79AEB0",
        djerba: {
          DEFAULT: "#3B2417",
          dark: "#241610",
        },
        ink: "#1C1A16",
      },
      fontFamily: {
        serif: ["var(--font-editorial)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
      fontSize: {
        "display-lg": ["clamp(3rem, 6vw, 6rem)", { lineHeight: "1.02", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(2.25rem, 4.5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.75rem, 3vw, 2.75rem)", { lineHeight: "1.1" }],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",