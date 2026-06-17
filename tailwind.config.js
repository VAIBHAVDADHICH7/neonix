/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
      extend: {
          fontFamily: {
              sans: ['"Plus Jakarta Sans"', 'sans-serif'],
          },
          colors: {
              dark: {
                  navy: '#12223a',
                  card: '#0b1424',
              },
              accent: {
                  yellow: '#f4b41a',
                  green: '#7bc043',
              }
          }
      }
  },
  plugins: [],
}
