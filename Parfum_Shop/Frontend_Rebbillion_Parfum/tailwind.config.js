/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'custom-xl':'1153px',
        'custom-lg': '1086px', 
        'custom':'953px',
        'custom-md':'850px',
        'custom-sm':'719px',
      },
    },
  },
  plugins: [],
}

