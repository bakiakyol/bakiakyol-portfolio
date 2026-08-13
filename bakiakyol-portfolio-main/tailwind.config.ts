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
        // Apple-style: temiz beyaz sistem
        "pharmacy-green": "#0071E3",   // Apple mavi — accent rengi
        "clinical-white": "#FAFAFA",   // Ana arka plan (neredeyse saf beyaz)
        "deep-ocean": "#1D1D1F",       // Apple'ın koyu gri metin rengi
      },
    },
  },
};

export default config;