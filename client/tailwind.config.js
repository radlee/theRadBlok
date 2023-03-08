/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          primary : '#111827',  //#2596BE,
          secondary: '#ffffff',
          tertiary: '#000',
          header: '#efefef',
          red: '#fa1313'
      }
    },
  },
  plugins: [],
}