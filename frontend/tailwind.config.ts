import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neural-dark': '#050816',
        'neural-bg': '#0F172A',
        'primary': '#6366F1',
        'accent-green': '#22C55E',
        'accent-orange': '#F97316',
        'accent-pink': '#FF4B81',
        'text-primary': '#E5E7EB',
        'text-muted': '#9CA3AF',
      },
      fontFamily: {
        'sans': ['Inter', 'Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
