const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit", // or 'media' or 'class'
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Rubik"],
    },
    rotate: {
      360: "360deg",
    },
    colors: {
      transparent: "transparent",
      primary: {
        300: "#464A4C",
        400: "#333435",
        500: "#262628",
      },
      accent: {
        300: "#EDEFF4",

        400: "#DADDE5",
        500: "#C1C5D1",
        600: "#B1BBC9",
      },
      green: "#00CC88",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
