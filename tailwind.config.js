/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat','Verdana', 'Geneva', 'Tahoma', 'sans-serif'],
        'body': ['Montserrat','Verdana', 'Geneva', 'Tahoma', 'sans-serif']
      }
    },
  },
  plugins: [],
  // corePlugins: {
  //   preflight: false,
  // },
}
