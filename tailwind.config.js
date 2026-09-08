/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: '#0a0b1e',
          card: '#121438',
          accent: '#00f0ff',
          neonPink: '#ff007f',
          neonYellow: '#ffe600',
          neonGreen: '#39ff14',
        }
      },
      fontFamily: {
        game: ['"Fredoka"', 'system-ui', 'sans-serif'],
        arcade: ['"Press Start 2P"', 'monospace'],
        orbitron: ['"Orbitron"', 'system-ui', 'sans-serif'],
        starwars: ['"Orbitron"', '"Fredoka"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(0, 240, 255, 0.6)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 0, 127, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
