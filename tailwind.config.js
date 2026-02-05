/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px", // Custom screen for 2K+ displays
      },
    },
  },
  plugins: [],
};
