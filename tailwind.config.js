import forms from '@tailwindcss/forms';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Suas customizações aqui
        dashboard: {
          background: '#f5eff2',
          border: '#cfd1d3',
          white: '#ffffff',
        }
      },
      borderRadius: {
        'dashboard': '16px',
      }
    }
  },
  plugins: [
    forms,
    animate
  ]
}
