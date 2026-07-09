import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        atlas: {
          gold: "#D4AF37",
          "gold-light": "#E7C66A",
          "gold-dark": "#B8920A",
          pink: "#FF2D9B",
          navy: "#0B1020",
          "navy-mid": "#10182B",
          "navy-dark": "#141C33",
          surface: "#0F172A",
          card: "#111827",
          sidebar: "#071426",
          green: "#2AC670",
          teal: "#64FFDA",
          red: "#FF6252",
          blue: "#3B82F6",
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        inter: ["Inter", "-apple-system", "sans-serif"],
        montserrat: ["Montserrat", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      backgroundImage: {
        "login-gradient": "linear-gradient(180deg, #0B1020 18.55%, #10182B 71.49%, #141C33 100%)",
        "dashboard-gradient": "radial-gradient(87.55% 87.55% at 50% 12.45%, rgba(10, 27, 77, 0.01) 49.52%, rgba(2, 8, 23, 0.20) 100%)",
        "gold-gradient": "linear-gradient(180deg, #D4AF37 -25%, #E7C66A 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 20px 0 rgba(212, 175, 55, 0.23)",
        "card-shadow": "0 10px 30px 0 rgba(0, 0, 0, 0.30)",
        "pink-glow": "0 0 20px 0 rgba(255, 45, 155, 0.08)",
        "blue-glow": "0 0 40px 0 rgba(37, 99, 235, 0.30)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
