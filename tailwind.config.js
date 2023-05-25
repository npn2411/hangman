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
      },
      animation: {
        'opacity-bg': 'opacity-bg 1s linear forwards',
        'bg-white-to-dark': 'white2dark 1s linear forwards',
        'fast-pulse': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
