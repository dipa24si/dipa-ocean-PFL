/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'Segoe UI', 'sans-serif'], 
        'display': ['Playfair Display', 'serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        // Coffee Shop Theme - Custom Colors
        'coffee': {
          50: '#FDF8F5',  
          100: '#F5E6D3',
          200: '#E8CBA8',
          300: '#DBA77D',
          400: '#CE8352',
          500: '#C15D27', 
          600: '#A94D1F',
          700: '#8A3A17',
          800: '#6B2910',
          900: '#3E2C1C', 
        },
        'brew': {
          50: '#FFFBF0',
          100: '#FFF8E7',
          200: '#FFE4B5',
          300: '#FFD580',
          400: '#FFC54B',
          500: '#FFB819', 
          600: '#CC9200',
          700: '#996D00',
          800: '#664800',
          900: '#332400',
        },
        'espresso': {
          50: '#F7F4F0',
          100: '#E8E0D8',
          200: '#D0C0B0',
          300: '#B8A088',
          400: '#9A8060',
          500: '#7A6248', 
          600: '#5F4E3A',
          700: '#463A2C',
          800: '#2D251D',
          900: '#1A0F0A',
        },
      },
    },
  },
  plugins: [],
}