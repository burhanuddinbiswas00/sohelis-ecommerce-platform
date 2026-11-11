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
          50: '#fbf8f5',
          100: '#f5efe7',
          200: '#ebdccf',
          300: '#dec2b0',
          400: '#cd9f85',
          500: '#bc8063',
          600: '#ad6c51',
          700: '#905643',
          800: '#76473b',
          900: '#613c34',
          950: '#341d1a',
        },
        ethnic: {
          red: '#962b29',
          gold: '#c2904d',
          terracotta: '#b85437',
          emerald: '#1e4838',
          sand: '#f7f4ee',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        bengali: ['"Hind Siliguri"', '"Noto Serif Bengali"', 'serif'],
      }
    },
  },
  plugins: [],
}
