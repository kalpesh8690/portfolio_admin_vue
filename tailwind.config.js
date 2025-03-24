/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5e72e4',
          light: '#7b8ff7',
          dark: '#4a5cd1',
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      maxHeight: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
  important: true, // This ensures Tailwind classes override Element UI styles
} 