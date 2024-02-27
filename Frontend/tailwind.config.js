/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#AAff85",
      },
      fontFamily: {
        primary: "CustomFont",
        gugi: "Gugi",
      },
      backgroundImage: {
        "bg-home": {
          src: "url('./src/assets/Images/Radial-Gradient.png')",
        },
      },
    },
  },
  plugins: [],
};
