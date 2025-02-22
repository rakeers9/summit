/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Main brand colors using CSS variables
        brand: {
          cyan1: 'var(--cyan1)',
          cyan2: 'var(--cyan2)',
          cyan3: 'var(--cyan3)',
          pink1: 'var(--pink1)',
          pink2: 'var(--pink2)',
          darkBlue: 'var(--dark-blue)',
        },
        // Semantic colors
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          light: 'var(--cyan3)',
          dark: 'var(--dark-blue)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
        },
        // UI specific colors
        navigation: {
          DEFAULT: 'var(--nav-background)',
          text: 'var(--foreground)',
          active: 'var(--cyan3)',
        },
        button: {
          primary: 'var(--primary)',
          primaryHover: 'var(--primary-hover)',
          secondary: 'var(--accent)',
          secondaryHover: 'var(--accent-hover)',
          text: 'var(--button-text)',
        },
        card: {
          DEFAULT: 'var(--card-background)',
          border: 'var(--card-border)',
          hover: 'var(--background)',
        },
        text: {
          primary: 'var(--foreground)',
          secondary: 'var(--primary)',
          accent: 'var(--accent)',
          light: '#FFFFFF',
        },
        background: {
          DEFAULT: 'var(--background)',
          primary: 'var(--background)',
          secondary: 'var(--card-background)',
          accent: 'var(--accent)',
        },
        // System colors
        border: "var(--card-border)",
        input: "var(--foreground)",
        ring: "var(--primary)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'brand-sm': '0 1px 2px rgb(var(--primary) / 0.1)',
        'brand': '0 4px 6px rgb(var(--primary) / 0.1)',
        'brand-lg': '0 10px 15px rgb(var(--primary) / 0.1)',
        'brand-xl': '0 20px 25px rgb(var(--primary) / 0.1)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(to right, var(--cyan1), var(--cyan3))',
        'accent-gradient': 'linear-gradient(to right, var(--pink1), var(--pink2))',
      },
    },
  },
  plugins: [],
}