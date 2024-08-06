/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
          'pastel-blue': '#B3CDE0',  
          'pastel-pink': '#FADADD',  
          
      },
  },
  },
  plugins: [],
}

