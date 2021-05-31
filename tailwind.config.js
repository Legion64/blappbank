module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    gradientColorStops: theme => ({
      ...theme('colors'),
      'custom-blue': '#271F80'
    }),
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        'tinder': '#fe3c72',
        'tinder-100': '#fe5080',
        'dark-600': '#C4C4C4',
        'dark-500': '#DFDFDF',
        'message-pink': 'rgba(255, 210, 223, .6)',
        'message-gray': 'rgba(227, 227, 227, .6)'
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
        '4': '4 4 0%',
      },
      fontFamily: {
        'body': ['Roboto']
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['odd'],
      opacity: ['disabled'],
      display: ['hover']
    },
  },
  plugins: []
}
