/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import c from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mn: "320px",
        xsm: "420px",
        xs: "576px",
      },
      "aaaa": {
        "scroll-behavior": "smooth",
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
      },
      gridAutoColumns: {
        fluid: "repeat(auto-fit,minmax(0,1fr))",
      },
      gridAutoRows: {
        fluid: "repeat(auto-fit,minmax(0,1fr))",
      },
      aspectRatio: {
        square: "1",
        "golden-w": "16/9",
        "golden-h": "9/16",
      },
      animation: {
        reset: "reset var(--reset-duration) infinite var(--reset-delay)",
        toast: "toast 5s ease-in-out forwards",
      },
      keyframes: {
        reset: {
          "50%": {
            transform:
              "translate(0,0) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1);",
          },
          "0%,100%": {
            transform:
              "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));",
          },
        },
        toast: {
          "0%": {
            translate:
              "0 0",
          },
          "10%": {
            translate:
              "-1000px 0",
          },
          "90%": {
            translate:
              "-1000px 0",
          },
          "100%": {
            translate:
              "0 0",
          },
        },
      },
      
    },
  },
  plugins: [
    require("tailwindcss-brand-colors"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};
