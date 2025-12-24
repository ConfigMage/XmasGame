/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        christmas: {
          red: '#c41e3a',
          green: '#165B33',
          gold: '#FFD700',
          cream: '#FFF8E7',
          darkRed: '#8B0000',
          lightGreen: '#2E8B57',
        }
      },
      fontFamily: {
        festive: ['Mountains of Christmas', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
    },
  },
  plugins: [],
}
