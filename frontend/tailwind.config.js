/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens
    },
    extend: {
      colors: {
        custom: {
          'gray-100': '#141414',
          'gray-90': '#191919',
          'gray-80': '#1E1E1E',
          'gray-70': '#232323',
          'gray-60': '#282828',
          'gray-50': '#2D2D2D',
          'gray-40': '#323232',
          'gray-30': '#373737',
          'gray-20': '#3C3C3C',
          'gray-10': '#414141',
          'white-56': 'rgba(255,255,255,0.56)',
          'white-32': 'rgba(255,255,255,0.32)'
        }
      }
    }
  },
  plugins: []
}
