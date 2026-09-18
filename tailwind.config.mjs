/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        sand: '#EFE7D9',
        linen: '#FAF7F2',
        walnut: '#7C5A3A',
        bark: '#5A4130',
        ink: '#2A2620',
        charcoal: '#1C1916',
        stone: '#8C8478',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.2em',
      },
    },
  },
  plugins: [],
};
