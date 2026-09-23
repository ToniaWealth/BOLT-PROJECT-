/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#fdfcf9',
          100: '#faf7f0',
          200: '#f3ede1',
          300: '#e9e0cd',
          400: '#d8ccb3',
          500: '#c4b494',
        },
        charcoal: {
          50: '#f7f6f4',
          100: '#e8e6e2',
          200: '#d1cec8',
          300: '#aaa5a0',
          400: '#7a7570',
          500: '#5c5752',
          600: '#474340',
          700: '#3a3733',
          800: '#2a2825',
          900: '#1c1a18',
          950: '#0d0c0b',
        },
        gold: {
          50: '#fbf7ee',
          100: '#f5ecd5',
          200: '#e9d4a8',
          300: '#d9b878',
          400: '#c9a961',
          500: '#b8924a',
          600: '#9c7a3a',
          700: '#7e6230',
          800: '#604a25',
          900: '#4a391c',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Jost"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'editorial': '0.02em',
        'wide-lg': '0.18em',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.8s ease-out forwards',
        'slow-zoom': 'slowZoom 20s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
