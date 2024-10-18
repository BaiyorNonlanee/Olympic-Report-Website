
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        customGreen: '#2a9d8f',
        customBlue1: '#0d3b66',
        customBlue2: '#1d5b95',
        customOldrose: '#f95738',
        customBrown1: '#ee964b',
        customBrown2: '#fff4ea',
        customYellow: '#f4d35e'
      },
    },
  },
  plugins: [],
}

