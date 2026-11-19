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
          crimson: '#832624',
          gold: '#c2904d',
          amber: '#d99b4d',
          terracotta: '#b85437',
          emerald: '#1e4838',
          sand: '#f7f4ee',
          cream: '#faf8f5',
          ivory: '#f4ede4',
          noir: '#1f1a18',
          charcoal: '#2a2421',
          sage: '#3b5249',
          plum: '#542638',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'Cambria', 'serif'],
        bengali: ['"Hind Siliguri"', '"Noto Serif Bengali"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'marquee-slow': 'marquee 42s linear infinite',
        'marquee-reverse': 'marquee-reverse 32s linear infinite',
        'kenburns': 'kenburns 22s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translate3d(0%, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translate3d(-50%, 0, 0)' },
          '100%': { transform: 'translate3d(0%, 0, 0)' },
        },
        kenburns: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.18)', opacity: '0.75' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}
