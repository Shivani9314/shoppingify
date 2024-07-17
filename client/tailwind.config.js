/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#f9a109",
        grayBg: "#FAFAFE",
        yellowBg: "#FFF0DE",
        darkRed: "#80485B",
        fullDark: "#454545",
        lightDark: "#34333A",
        lightGray: "#BDBDBD",
        white: "#FFFFFF",
        gray: "#C1C1C4",
        darkGray: "#828282",
        red: "#EB5757",
        blue: "#56CCF2",
      },
    },
  },
  plugins: [],
};
