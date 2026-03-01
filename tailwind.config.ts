import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "rakura-gold": "var(--rakura-gold)",
        "rakura-gold-light": "var(--rakura-gold-light)",
        "rakura-accent": "var(--rakura-accent)",
        "rakura-purple": "var(--rakura-purple)",
        "rakura-muted": "var(--rakura-muted)",
      },
      fontFamily: {
        sans: ["var(--font-sarabun)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out both",
        "fade-in-up": "fade-in-up 0.6s ease-out both",
        "fade-in-down": "fade-in-down 0.5s ease-out both",
        "scale-in": "scale-in 0.4s ease-out both",
      },
      boxShadow: {
        "soft": "0 2px 15px -3px rgb(0 0 0 / 0.07), 0 10px 20px -2px rgb(0 0 0 / 0.04)",
        "soft-lg": "0 10px 40px -10px rgb(0 0 0 / 0.1), 0 2px 10px -2px rgb(0 0 0 / 0.05)",
        "gold": "0 4px 14px 0 rgb(184 134 11 / 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
