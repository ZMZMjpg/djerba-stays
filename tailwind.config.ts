import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFFDF8",
        sand: "#E4EFEE",
        sun: "#E9A83A",
        terracotta: "#C96F4A",
        sea: "#79AEB0",
        ocean: {
          DEFAULT: "#167373",
          dark: "#0F5555",
        },
        djerba: {
          DEFAULT: "#167373",
          dark: "#0F5555",
        },
        ink: "#1C1A16",
      },
      fontFamily: {
        serif: ["var(--font-editorial)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
      fontSize: {
        "display-lg": ["4.5rem", { lineHeight: "1.02", letterSpacing: "-0.01em" }],
        "display-md": ["3.25rem", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.1" }],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "14px",
        xl: "20px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(22, 115, 115, 0.06), 0 8px 24px -8px rgba(22, 115, 115, 0.12)",
        elevated: "0 4px 8px rgba(22, 115, 115, 0.08), 0 16px 40px -12px rgba(22, 115, 115, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;