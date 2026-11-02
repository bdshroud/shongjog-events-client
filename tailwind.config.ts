import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
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
        primary: {
          DEFAULT: "#B845EC", // Evenjo signature vibrant orchid/purple
          hover: "#A838DE",
          light: "#F3E8FF",
          dark: "#9333EA",
        },
        accent: {
          DEFAULT: "#C04BF2",
          hover: "#A838DE",
          light: "#FCE7F3",
        },
        violet: {
          950: "#090514", // Deep nocturnal canvas
          900: "#0E091C",
          850: "#130E24", // Dark glass card surface
          800: "#1A1330",
          700: "#271B48",
          600: "#492E7E",
          500: "#7C3AED",
          400: "#A855F7",
          300: "#C084FC",
          200: "#E9D5FF",
          100: "#F3E8FF",
          50: "#FAF5FF",
        },
      },
      fontFamily: {
        script: ["'Playball'", "'Pacifico'", "cursive"],
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      aspectRatio: {
        "16/10": "16 / 10",
        square: "1 / 1",
      },
    },
  },
  plugins: [],
};

export default config;
