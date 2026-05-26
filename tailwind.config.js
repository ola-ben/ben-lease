/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0F1419',
          soft: '#5A6470',
          faint: '#9AA3AE',
        },
        paper: '#FBFAF7',
        cream: '#F2EEE7',
        sand: '#E5DFD3',
        umber: {
          DEFAULT: '#8B4513',
          soft: '#F5E6D8',
        },
        verified: '#2D6A4F',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero: ['40px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        section: ['24px', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        property: ['20px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        caption: ['11px', { lineHeight: '1.3', letterSpacing: '0.1em' }],
      },
      letterSpacing: {
        wordmark: '-0.02em',
      },
      borderRadius: {
        card: '16px',
        image: '14px',
        btn: '12px',
      },
      boxShadow: {
        rest: '0 1px 2px rgba(15,20,25,0.04), 0 4px 12px rgba(15,20,25,0.04)',
        elevated: '0 12px 40px rgba(15,20,25,0.12)',
      },
      maxWidth: {
        phone: '480px',
      },
    },
  },
  plugins: [],
};
