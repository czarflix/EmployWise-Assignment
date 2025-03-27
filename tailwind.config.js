/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "card-bg": "var(--card-bg)",
        "card-border": "var(--card-border)",
        "card-shadow": "var(--card-shadow)",
        "input-border": "var(--input-border)",
        "input-bg": "var(--input-bg)",
        "input-text": "var(--input-text)",
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-hover": "var(--secondary-hover)",
        "secondary-foreground": "var(--secondary-foreground)",
        success: "var(--success)",
        danger: "var(--danger)",
        muted: "var(--muted)",
        "navbar-bg": "var(--navbar-bg)",
        "navbar-text": "var(--navbar-text)",
        "navbar-text-hover": "var(--navbar-text-hover)",
      },
      boxShadow: {
        card: "0 8px 30px var(--card-shadow)",
        search: "0 2px 4px var(--card-shadow)",
        hover: "0 6px 12px var(--card-shadow)",
      },
      animation: {
        spin: "spin 1s linear infinite",
      },
      keyframes: {
        spin: {
          to: { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
