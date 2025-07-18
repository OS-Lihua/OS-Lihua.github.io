/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './public/**/*.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        blacktext: '#171717',
        mint: {
          50: '#ecfdf5',
          100: '#d0fbe5',
          200: '#a4f4cf',
          300: '#6ce9b7',
          400: '#31d69a',
          500: '#0dbc82',
          600: '#03986a',
          700: '#027a58',
          800: '#056047',
          900: '#054f3c',
          950: '#012d22',
        },
        riptide: {
          50: '#f0fdfa',
          100: '#cbfcf1',
          200: '#96f7e4',
          300: '#5cecd5',
          400: '#2bd6c1',
          500: '#12baa8',
          600: '#0b9689',
          700: '#0e776f',
          800: '#105f5a',
          900: '#124f4b',
          950: '#03302f',
        },
      },
      animation: {
        'rotate': 'rotate 10s linear infinite',
        'rotate-border': 'border-rotate 3s linear infinite',
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg) scale(10)' },
          '100%': { transform: 'rotate(-360deg) scale(10)' },
        },
        'border-rotate': {
          'to': { '--border-angle': '360deg' },
        },
      },
      backgroundImage: {
        'conic': 'conic-gradient(from var(--border-angle), var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('tailwindcss-animated'),
  ],
};
