/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      black: "#000",
      white: "#fff",
      mGreen: "#999813",
      mRed: "#dd2d4a",
      bgGreen: "#203529",
      mYellow: "#ffeaa7",
      mPred: "#f4978e",
      lightGreen: "#139860",
      lightRed: "#f08080",
    },
  },
  plugins: [],
};
