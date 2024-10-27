/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        customBlue: '#e0f2fe',
        customBlue1: '#0d3b66',
        customBlue2: '#1d5b95',
        customYellow: '#f4d35e',
        customOrange: '#ee964b',
        customRed: '#991b1b',
        customGreen: '#ecfccb',
        customGreen2: '#2a9d8f',
        customOrange2: '#fff4ea',
        // customRed: '#d22e38',
        customPurple: '#be123c',
        customGray: '#94a3b8',
        customOldrose: '#f95738',
        customBrown1: '#ee964b',
        customBrown2: '#fff4ea',
      },
      fontFamily: {
        sans: ['Avenir', 'Helvetica', 'Arial', 'sans-serir']
      },
    },
  },
  plugins: [],
}

