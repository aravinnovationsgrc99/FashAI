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
        brand: {
          orange: "#F15E1C",
          black: "#000000",
          void: "#080808",
          atelier: "#0C0B0A",
          charcoal: "#141312",
          "charcoal-border": "#1A1918",
          gold: "#E5C287",
          "gold-pure": "#D4AF37",
          "gold-luster": "#FAB60A",
          white: "#FFFFFF",
          "off-white": "#FDFBF7",
          platinum: "#8E8B85",
          emerald: "#2E936F",
          lemon: "#FFEC69",
          peach: "#F7D7B0",
        },
      },
      fontFamily: {
        serif: ["var(--font-bodoni-moda)", "Bodoni Moda", "Didot", "serif"],
        sans: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "sans-serif"],
        syne: ["var(--font-syne)", "Syne", "sans-serif"],
      },
      borderRadius: {
        none: "0px",
        DEFAULT: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        full: "0px",
      },
      letterSpacing: {
        micro: "0.28em",
        caps: "0.24em",
        editorial: "0.02em",
      },
      aspectRatio: {
        portrait: "4 / 5",
        cinematic: "2.39 / 1",
      },
    },
  },
  plugins: [],
};
export default config;
