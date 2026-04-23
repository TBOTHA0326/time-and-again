import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: '#8FAF9F',
          50: '#F0F5F2',
          100: '#DEE9E3',
          200: '#C2D5CA',
          300: '#A5C0B2',
          400: '#8FAF9F',
          500: '#6E9584',
          600: '#567668',
          700: '#425A4F',
          800: '#2E3F37',
          900: '#1D2823',
        },
        slate: {
          brand: '#3D4F5C',
        },
        sand: {
          DEFAULT: '#B8A98A',
          light: '#CDBFA4',
          dark: '#9E8E6E',
        },
        cream: {
          DEFAULT: '#F5F2EC',
          deep: '#EDE8DE',
        },
        charcoal: '#2C2C2C',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
      },
      boxShadow: {
        soft: '0 20px 40px -15px rgba(61, 79, 92, 0.12)',
        card: '0 30px 60px -20px rgba(61, 79, 92, 0.18)',
        inset: 'inset 0 1px 0 rgba(255,255,255,0.4)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'restore-mobile': {
          '0%': { filter: 'grayscale(1) sepia(0.4) contrast(0.85) brightness(0.9)' },
          '100%': { filter: 'grayscale(0) sepia(0) contrast(1) brightness(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'marquee': 'marquee 40s linear infinite',
        'restore-mobile': 'restore-mobile 4s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
export default config
