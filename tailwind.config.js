const defaultTheme = require('tailwindcss/defaultTheme');
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './views/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {},
    fontFamily: {
      sans: ['Inter', ...fontFamily.sans],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('./themes/index'),
    require("daisyui")
  ],
};
