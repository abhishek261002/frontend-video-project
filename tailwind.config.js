/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jaro : ["Jaro", "sans-serif"],
        jersey : ["Jersey 15", "sans-serif"]
      }
    },
  },
  plugins: [],
}

