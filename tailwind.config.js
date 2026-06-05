/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        obsidian: { 900: '#0A0A0A', 800: '#111111', 700: '#1A1A1A', 600: '#222222' },
        gold: { 400: '#C9A96E', 300: '#D4B483', 500: '#B8943A' },
        cream: { 100: '#FAFAF8', 200: '#F0EDE8', 300: '#E0DDD8' },
      }
    },
  },
  plugins: [],
}