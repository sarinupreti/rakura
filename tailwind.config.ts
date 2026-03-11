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
        /* ── New modern animations ── */
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "clip-reveal": {
          "0%": { clipPath: "inset(0 100% 0 0)", opacity: "1" },
          "100%": { clipPath: "inset(0 0% 0 0)", opacity: "1" },
        },
        "zoom-in": {
          "0%": { opacity: "0", transform: "scale(0.88)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(5deg)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 4px 14px 0 rgb(201 165 42 / 0.3)" },
          "50%": { boxShadow: "0 4px 30px 6px rgb(201 165 42 / 0.55)" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgb(201 165 42 / 0.3)" },
          "50%": { borderColor: "rgb(201 165 42 / 0.8)" },
        },
        "steam": {
          "0%": { opacity: "0", transform: "translateY(0px) scaleX(1)" },
          "40%": { opacity: "0.5" },
          "100%": { opacity: "0", transform: "translateY(-60px) scaleX(1.5)" },
        },
        "twinkle": {
          "0%, 100%": { opacity: "0.2", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.3)" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "leaf-fall": {
          "0%": { transform: "translateY(-10px) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "0.7" },
          "100%": { transform: "translateY(100vh) rotate(360deg)", opacity: "0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        "text-reveal": {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "line-grow": {
          "0%": { transform: "scaleX(0)", transformOrigin: "left" },
          "100%": { transform: "scaleX(1)", transformOrigin: "left" },
        },
        "number-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out both",
        "fade-in-up": "fade-in-up 0.6s ease-out both",
        "fade-in-down": "fade-in-down 0.5s ease-out both",
        "scale-in": "scale-in 0.4s ease-out both",
        "marquee": "marquee 30s linear infinite",
        "slide-up": "slide-up 0.35s ease-out both",
        /* ── New modern animations ── */
        "slide-in-left": "slide-in-left 0.65s cubic-bezier(0.16,1,0.3,1) both",
        "slide-in-right": "slide-in-right 0.65s cubic-bezier(0.16,1,0.3,1) both",
        "clip-reveal": "clip-reveal 0.8s cubic-bezier(0.16,1,0.3,1) both",
        "zoom-in": "zoom-in 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "float": "float 3s ease-in-out infinite",
        "float-slow": "float-slow 5s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "border-glow": "border-glow 2s ease-in-out infinite",
        "steam": "steam 2.5s ease-out infinite",
        "twinkle": "twinkle 2s ease-in-out infinite",
        "rotate-slow": "rotate-slow 20s linear infinite",
        "leaf-fall": "leaf-fall 8s ease-in-out infinite",
        "pulse-ring": "pulse-ring 1.5s ease-out infinite",
        "text-reveal": "text-reveal 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "line-grow": "line-grow 0.8s cubic-bezier(0.16,1,0.3,1) both",
        "number-up": "number-up 0.5s cubic-bezier(0.16,1,0.3,1) both",
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
