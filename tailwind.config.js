/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0c0f14",
        gold: "#b8975a",
        goldlight: "#d4b888",
        paper: "#faf8f4",
        slate: "#1c2230"
      },
      fontFamily: {
        serif: ["'Noto Serif Arabic'", "serif"],
        sans: ["'IBM Plex Sans Arabic'", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
