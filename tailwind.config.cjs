/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        bgImageGalaxy: "url('/assets/background-galaxy.png')",
        nlw_gradient:
          'linear-gradient(89.86deg, #9572FC 5%, #43E7AD 70%, #E1D55D 95%)',
        gamecard_gradient:
          'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)'
      },
      colors: {
        nlw: {
          clr_background: '#121214',
          clr_pub_bg: '#2A2634',
        }
      },
      fontFamily: {
        sans: 'Inter'
      }
    }
  },
  plugins: []
}
