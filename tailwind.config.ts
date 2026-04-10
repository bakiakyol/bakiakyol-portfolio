import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "pharmacy-green": "#A855F7", // OLED black tema için mor accent renk
        "clinical-white": "#050505", // Ana arka plan
        "deep-ocean": "#F5F7FA", // Ana yazı rengi
      },
    },
  },
};

export default config;