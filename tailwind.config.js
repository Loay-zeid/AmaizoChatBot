// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        selectedBg: '#13141A',
        sideBarColor : '#0A0B0E',
        selectedOrange : '#FF9478',
        messagesBg :'#ECE9E980',
      },
    },
  },
  variants: {},
  plugins: [require("tailwindcss"), require("autoprefixer")],
};


