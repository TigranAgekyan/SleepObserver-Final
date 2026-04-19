/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'my_primary': '#2C3E50',
        'my_secondary': '#DADADA',
        'my_accent': '#B19CD9',
        'my_white': '#F9F9F9',
        'my_grey': '#E7E7E7',
        'my_black': '#0F0F0F',
        'my_BG_light': '#2e4052',
        'my_BG_dark': '#090d10',
      },
      dropShadow: {
        glow: [
          "0 0px 15px rgba(255,255, 255, 0.5)",
          "0 0px 5px rgba(255,255,255, 0.35)"
        ],
        'self': [
          "0px 0px 16px rgba(0,0,0,0.25)"
        ],
        'self_small': [
          "0px 0px 8px rgba(0,0,0,0.25)"
        ]
      },
      keyframes: {
        'fade-in': {
          '0%': {opacity: 0},
          '100%': {opacity: 1}
        }
      },
      animation: {
        'fade-in': 'fade-in 0.25s ease-in-out 1'
      }
    },
    fontFamily: {
      'inter': ['Inter', 'sans-serif']
    },

  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

