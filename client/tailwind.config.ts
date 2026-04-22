import { colors } from './src/theme/colors.js'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors,
      fontFamily: {
        devotional: ['Cinzel', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        temple:    '0 2px 8px rgba(107,30,40,0.08), 0 1px 3px rgba(107,30,40,0.06)',
        'temple-md': '0 4px 16px rgba(107,30,40,0.12), 0 2px 6px rgba(107,30,40,0.08)',
        'temple-lg': '0 8px 32px rgba(107,30,40,0.16), 0 4px 12px rgba(107,30,40,0.10)',
        gold:      '0 0 0 3px rgba(184,134,11,0.25)',
      },
      backgroundImage: {
        'hero-gradient':   'linear-gradient(to bottom, rgba(74,16,24,0.75) 0%, rgba(74,16,24,0.35) 45%, rgba(28,18,8,0.70) 100%)',
        'gold-gradient':   'linear-gradient(135deg, #B8860B 0%, #EDD878 50%, #B8860B 100%)',
        'maroon-gradient': 'linear-gradient(180deg, #6B1E28 0%, #4A1018 100%)',
      },
    },
  },
  plugins: [],
}
