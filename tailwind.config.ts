import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-syne)', 'var(--font-dm-sans)', 'sans-serif'],
      },
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        'bg-elevated': 'rgb(var(--bg-elevated) / <alpha-value>)',
        'bg-card': 'rgb(var(--bg-card) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        'border-muted': 'rgb(var(--border-muted) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-muted': 'rgb(var(--accent-muted) / <alpha-value>)',
      },
      borderRadius: {
        'token': 'var(--radius)',
        'token-lg': 'var(--radius-lg)',
        'token-xl': 'var(--radius-xl)',
      },
      boxShadow: {
        'soft': 'var(--shadow)',
        'glow': 'var(--shadow-glow)',
      },
    },
  },
  plugins: [],
}
export default config
