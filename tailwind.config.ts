import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media",
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
        "rakura-crimson": "var(--rakura-crimson)",
        "rakura-dark": "var(--rakura-dark)",
      },
      fontFamily: {
        sans: ["var(--font-sarabun)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "ui-serif", "serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
        widest3: "0.35em",
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
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Subtle page-to-page transition — used by template.tsx
        "page-enter": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out both",
        "fade-in-up": "fade-in-up 0.6s ease-out both",
        "fade-in-down": "fade-in-down 0.5s ease-out both",
        "scale-in": "scale-in 0.4s ease-out both",
        "marquee": "marquee 30s linear infinite",
        "slide-up": "slide-up 0.35s ease-out both",
        "page-enter": "page-enter 0.4s ease-out both",
      },
      boxShadow: {
        "soft": "0 2px 15px -3px rgb(0 0 0 / 0.07), 0 10px 20px -2px rgb(0 0 0 / 0.04)",
        "soft-lg": "0 10px 40px -10px rgb(0 0 0 / 0.1), 0 2px 10px -2px rgb(0 0 0 / 0.05)",
        "gold": "0 4px 14px 0 rgb(201 165 42 / 0.3)",
        "gold-lg": "0 8px 30px -4px rgb(201 165 42 / 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
