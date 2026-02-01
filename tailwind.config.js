/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Press Start 2P"', 'cursive'],
        body: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 25px rgba(255, 214, 102, 0.35)'
      },
      backgroundImage: {
        starfield: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12), transparent 25%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.09), transparent 22%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.06), transparent 20%)'
      }
    },
  },
  plugins: [],
}
