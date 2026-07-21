/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chrono: {
          dark: '#0B0B0B',      // Base dark theme background
          charcoal: '#141414',  // Dark card background
          gold: '#D4AF37',      // Primary luxury gold accent
          goldLight: '#E5C158', // Light gold for hover states
          goldDark: '#B3922E',  // Darker gold for borders/shadows
          gray: '#8E8E93',      // Secondary text gray
          lightGray: '#C7C7CC', // Brighter secondary text gray
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
