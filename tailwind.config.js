const { theme } = require("tailwindcss/defaultConfig");

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['sans-serif', ...theme.fontFamily.serif],
        mukta: ['Mukta', ...theme.fontFamily.serif],
      },
      colors: {
        customButton: {
          50: "#50005a",
          100: "#6a0a77",
        },
        customInputs: {
          50: "#ccc",
        },
        table: {
          gray150: '#f4f6fb',
        },
      }
    },
    screens: {
      tablet: { min: "640px" },
      laptop: { min: "1024px" },
      desktop: { min: "1280px" },
    },
    boxShadow: {
      table_thead: '0 5px 10px #e1e5ee',
    },
  },
  variants: {
    extend: {
      display: ['first'],
      backgroundColor: ['odd'],
      borderWidth: ['first', 'last'],
      borderColor: ['first', 'last']
    },
  },
  plugins: [],
}
