import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        owner: "#2563eb", // bleu
        brand: "#a21caf", // violet
        public: "#6b7280", // gris
      },
    },
  },
  plugins: [],
};
export default config;
