import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      sans: [
        'ABC Ginto Normal',
        'var(--font-abc-ginto)',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'sans-serif'
      ],
    },
    colors: {
      inherit: "inherit",
      transparent: "transparent",
      black: "#000",
      "off-black": "#180404",
      white: "#fff",
      skin1: "#F2ECE6",
      skin2: "#F2ECE6",
      skin3: "#CCBAAD",
      skin4: "#FAE7D4",
      skin5: "#42332A",
      yellow: "#F4FF78",
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      brand: {
        dark: "hsl(var(--brand-dark))",
        yellow: "hsl(var(--brand-yellow))",
        warm: "hsl(var(--brand-warm))",
        mid: "hsl(var(--brand-mid))",
        beige: "hsl(var(--brand-beige))",
      },
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
      sidebar: {
        DEFAULT: "hsl(var(--sidebar-background))",
        foreground: "hsl(var(--sidebar-foreground))",
        primary: "hsl(var(--sidebar-primary))",
        "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
        accent: "hsl(var(--sidebar-accent))",
        "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
        border: "hsl(var(--sidebar-border))",
        ring: "hsl(var(--sidebar-ring))",
      },
    },
    fontSize: {
      xlarge: [
        "95px",
        { fontWeight: 255, lineHeight: "105px", letterSpacing: "-0.02em" },
      ],
      large: [
        "65px",
        { fontWeight: 265, lineHeight: "75px", letterSpacing: "-0.03em" },
      ],
      medium: [
        "30px",
        { fontWeight: 300, lineHeight: "40px", letterSpacing: "0.01em" },
      ],
      small: [
        "17px",
        { fontWeight: 400, lineHeight: "25px", letterSpacing: "0.01em" },
      ],
    },
    borderRadius: {
      10: "10px",
      15: "15px",
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
      "2xl": "1rem",
      "3xl": "1.5rem",
    },
    spacing: {
      0: "0",
      2: "2px",
      4: "4px",
      7: "7px",
      9: "9px",
      10: "10px",
      15: "15px",
      20: "20px",
      25: "25px",
      30: "30px",
      40: "40px",
      50: "50px",
      60: "60px",
      75: "75px",
      80: "80px",
      100: "100px",
      115: "115px",
      130: "130px",
      160: "160px",
      400: "400px",
    },
    maxWidth: {
      450: "450px",
      full: "100%",
    },
    backdropBlur: {
      DEFAULT: "7.5px",
    },
    transitionDuration: {
      slow: "700ms",
    },
    extend: {
      gridTemplateRows: {
        valueprop: "minmax(80px, min-content), 1fr, minmax(80px, min-content)",
        valueproplg:
          "minmax(100px, min-content), 1fr, minmax(100px, min-content)",
      },
      order: {
        0: "0",
      },
      aspectRatio: {
        portrait: "163 / 171",
      },
      opacity: {
        2: "0.02",
        12: "0.12",
        85: "0.85",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        almost: "90vh",
        almosthalf: "45vh",
      },
      maxHeight: {
        almost: "90vh",
        almosthalf: "45vh",
      },
      minHeight: {
        almosthalf: "45vh",
      },
      borderWidth: {
        half: "0.5px",
      },
      typography: ({ theme }: { theme: Function }) => ({
        DEFAULT: {
          css: {
            lineHeight: "inherit",
            "--tw-prose-body": "inherit",
            "--tw-prose-headings": "inherit",
            "--tw-prose-lead": "inherit",
            "--tw-prose-links": "inherit",
            "--tw-prose-bold": "inherit",
            "--tw-prose-counters": "inherit",
            "--tw-prose-bullets": "inherit",
            "--tw-prose-hr": "inherit",
            "--tw-prose-quotes": "inherit",
            "--tw-prose-quote-borders": "inherit",
            "--tw-prose-captions": "inherit",
            "--tw-prose-kbd": "inherit",
            "--tw-prose-kbd-shadows": "inherit",
            "--tw-prose-code": "inherit",
            "--tw-prose-pre-code": "inherit",
            "--tw-prose-pre-bg": "inherit",
            "--tw-prose-th-borders": "inherit",
            "--tw-prose-td-borders": "inherit",
            a: {
              fontWeight: "inherit",
              textDecoration: "underline",
              textDecorationColor: theme("colors.black/.20"),
              textUnderlineOffset: "0.25em",
              "&:hover": {
                textDecorationColor: theme("colors.black"),
              },
            },
            h2: {
              fontSize: "30px",
              fontWeight: 300,
              lineHeight: "40px",
              letterSpacing: "0.01em",
              marginBottom: "10px",
            },
            h3: {
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "25px",
              letterSpacing: "0.01em",
              marginTop: "40px",
              marginBottom: "5px",
            },
          },
        },
      }),
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--primary) / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(var(--primary) / 0.6)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "scale-up": {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "scroll-left": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "word-float": {
          "0%": { opacity: "0", transform: "translate(-50%, -50%) scale(0.8)" },
          "15%": { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
          "85%": { opacity: "1", transform: "translate(-50%, -55%) scale(1)" },
          "100%": { opacity: "0", transform: "translate(-50%, -60%) scale(0.95)" },
        },
        "word-float-slow": {
          "0%": { opacity: "0", transform: "translate(-50%, -50%) scale(0.9)" },
          "10%": { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
          "90%": { opacity: "1", transform: "translate(-50%, -55%) scale(1)" },
          "100%": { opacity: "0", transform: "translate(-50%, -60%) scale(0.95)" },
        },
        "underline-expand": {
          "0%": { transform: "scaleX(0)", transformOrigin: "left" },
          "100%": { transform: "scaleX(1)", transformOrigin: "left" },
        },
        upDown: {
          "20%": {
            transform: "none",
            "animation-timing-function": "ease-in",
          },
          "60%": {
            transform: "translateY(5px)",
            "animation-timing-function": "ease-out",
          },
        },
        slideUpEnter: {
          "0%": {
            transform: "translateX(100%)",
          },
          "100%": {
            transform: "translateY(0px)",
          },
        },
        slideUpLeave: {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(20px)",
          },
        },
        skeleton: {
          "0%, 25%, 75%, 100%": {
            opacity: "0.42",
          },
          "50%": {
            opacity: "1",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out forwards",
        "slide-down": "slide-down 0.5s ease-out forwards",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "scale-up": "scale-up 0.4s ease-out forwards",
        "scroll-left": "scroll-left 30s linear infinite",
        "word-float": "word-float 4s ease-in-out forwards",
        "word-float-slow": "word-float-slow 8s ease-in-out forwards",
        "underline-expand": "underline-expand 1s ease-out 0.5s forwards",
        slideUpEnter: "slideUpEnter .7s ease-in-out",
        slideUpLeave: "slideUpLeave .7s ease-in-out",
        updown: "upDown 2s infinite",
        skeleton: "skeleton 2.1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography")
  ],
} satisfies Config;