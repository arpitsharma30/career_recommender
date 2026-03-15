/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        saffron: { 400:"#ffb347", 500:"#f97316", 600:"#ea580c" },
      },
    },
  },
  plugins: [],
}