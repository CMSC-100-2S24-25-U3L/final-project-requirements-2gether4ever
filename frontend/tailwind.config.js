/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'false',
  theme: {
    extend: {
      colors: {
        forest: '#2E7D32',
        earth: '#8D6E63',
        leafy: '#AED581',
        cream: '#FFF8E1',
        terracotta: '#EF6C00',
        charcoal: '#424242',
      },
    },
  },
  plugins: [require('daisyui')],
};
