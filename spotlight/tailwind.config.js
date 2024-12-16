/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        electric_blue: "#007BFF", //Primary
        bright_orange: "#FF5733", //Accent
        slate_grey: "#2E2E2E", //Neutral:
        light_grey: "#F2F2F2", //Background:
        lime_green: "#00FF7F", //highlight
      },
    },
  },
  plugins: [],
};
