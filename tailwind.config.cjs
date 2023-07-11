/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html", "./node_modules/flowbite/**/*.js"],

  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'backgroundColor': {
          normal: 'white',
          inverted: '#202020'
        },
        'backgroundSecondaryColor': {
          normal: '#C5C6C7',
          inverted: '#303030'
        },
        'h1Color': {
          normal: '#0B0C10',
          inverted: 'white',
        },
        'h2Color': {
          normal: '#C5C6C7',
          inverted: '#1F2833',
        },
        'textColor': {
          normal: 'white',
          inverted: '#0B0C10'
        },
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),],
    darkMode: 'class'
}
