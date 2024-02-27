/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        green: "url('/src/assets/green.png')",
      },
    },
  },
  plugins: [],
};
