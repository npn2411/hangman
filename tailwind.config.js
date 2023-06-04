module.exports = {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    extend: {
      colors: {
        red500: '#ef4444',
        green500: '#22c55e',
      },
      fontFamily: {
        poppins: ['poppins'],
      },
      keyframes: {
        'opacity-bg': {
          '0%': { opacity: 0, backgroundColor: '#a2a2a2' },
          '50%': { opacity: 0.5 },
          '100%': { opacity: 1, backgroundColor: 'rgba(0,0,0,0.8)' },
        },
        white2dark: {
          '0%': { backgroundColor: '#fff' },
          '100%': { backgroundColor: '#000' },
        },
        spring: {
          '0%, 100%': { transform: 'translateY(0)', rotate: '0deg' },
          '25%': { transform: 'translateY(-30%)', rotate: '30deg' },
          '50%': { transform: 'translateY(-30%)', rotate: '-30deg' },
        },
        scale: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.25)' },
        },
      },
      animation: {
        'opacity-bg': 'opacity-bg 1s linear forwards',
        'bg-white-to-dark': 'white2dark 1s linear forwards',
        'fast-pulse': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        spring: 'spring .25s linear',
        scale: 'scale 1s linear infinite',
      },
    },
  },
  plugins: [],
};
