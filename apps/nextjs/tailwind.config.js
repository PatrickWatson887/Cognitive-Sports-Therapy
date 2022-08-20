const screensSettings = require('./config/tailwind.screens.settings');
const fontSizeSettings = require('./config/tailwind.fonts.settings');

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Plus Jakarta Sans',
          // @ts-ignore
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
    screens: screensSettings,
    fontSize: fontSizeSettings,
    debugScreens: {
      position: ['bottom', 'right'],
      prefix: '',
      style: {
        borderTopLeftRadius: '5px',
        fontFamily: `'Nunito', sans-serif`,
      },
    },
  },
  plugins: [],
};
