// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cblue: {
          1000: "#19283E",
          500: "#151319",
          400: "#22212E",
          300: "#353747",
        },
        offwhite: "F5F5F5",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
