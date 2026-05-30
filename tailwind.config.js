/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0C1410',
          soft: '#5A6470',
          faint: '#9AA3AE',
        },
        paper: '#FAFAF7',
        cream: '#ECEFEA',
        sand: '#D9E0D6',
        umber: {
          DEFAULT: '#2D6A4F',
          soft: '#DCEBE2',
        },
        verified: '#1F4D38',
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
        rest: '0 1px 2px rgba(12,20,16,0.04), 0 4px 12px rgba(12,20,16,0.04)',
        elevated: '0 12px 40px rgba(12,20,16,0.12)',
      },
      maxWidth: {
        phone: '430px',
      },
    },
  },
  plugins: [],
};
