/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'pokemon': "url('/photo/Blastoise (1).png')", // Public folder se image ka correct path
      },
      screens: {
        'max-lg': {'min-width': '900px'}, // Custom max-width 900px
      },
    },
  },
  plugins: [],
}

