/** @type {import('tailwindcss').Config} */
const defaultColors = require('tailwindcss/colors')
export default {
  content: [],
  theme: {
    extend: {

      aspectRatio:{
        oneFourth: '1/4'
      },

      colors: {
        primary: defaultColors.indigo,
        secondary: {
          100: "#FFFCE5",
          200: "#FFF4AB",
          300: "#FFED72",
          400: "#FFE639",
          500: "#ffdf00",
          600: "#D8C000",
          700: "#B29E00",
          800: "#8C7C00",
          900: "#665A00"
        },
        thirdary: defaultColors.yellow
      },
    },
  },
  plugins: [],
}

module.exports = {
  theme: {
    extend: {
      colors: {
        bg: 'var(--tg-theme-bg-color)',
        text: 'var(--tg-theme-text-color)',
        hint: 'var(--tg-theme-hint-color)',
        link: 'var(--tg-theme-link-color)',
        button: 'var(--tg-theme-button-color)',
        buttonText: 'var(--tg-theme-button-text-color)',
        secondaryBg: 'var(--tg-theme-secondary-bg-color)',
        headerBg: 'var(--tg-theme-header-bg-color)',
        bottomBarBg: 'var(--tg-theme-bottom-bar-bg-color)',
        accentText: 'var(--tg-theme-accent-text-color)',
        sectionBg: 'var(--tg-theme-section-bg-color)',
        sectionHeaderText: 'var(--tg-theme-section-header-text-color)',
        sectionSeparator: 'var(--tg-theme-section-separator-color)',
        subtitleText: 'var(--tg-theme-subtitle-text-color)',
        destructiveText: 'var(--tg-theme-destructive-text-color)',
      },
    },
  },
};
