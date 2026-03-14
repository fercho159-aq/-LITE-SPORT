import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080A0F",
        foreground: "#F5F5F5",
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E8D48B",
          dark: "#A88A2B",
        },
        electric: {
          DEFAULT: "#00D4FF",
          light: "#66E5FF",
          dark: "#009DBF",
        },
        surface: {
          DEFAULT: "#0D1117",
          light: "#161B22",
          lighter: "#21262D",
        },
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-gold": "linear-gradient(135deg, #D4AF37, #E8D48B)",
        "gradient-electric": "linear-gradient(135deg, #00D4FF, #0099CC)",
        "gradient-dark": "linear-gradient(180deg, #080A0F, #0D1117)",
        "gradient-radial": "radial-gradient(ellipse at center, #0D1117, #080A0F)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(212, 175, 55, 0.6)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
