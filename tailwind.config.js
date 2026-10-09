/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f8f3',
          100: '#e5efe3',
          200: '#cdddca',
          500: '#3D6734',
          600: '#34572c',
          700: '#2a4623',
          800: '#21371c',
        },
        surface: {
          gray: '#F1F1F1',
          light: '#F8F9FA'
        }
      }
    },
  },
  plugins: [],
};
