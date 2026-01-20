import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: "var(--font-abc-ginto)",
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
            lineHeight: "ineherit",
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
            /*    opacity: "0", */
            transform: "translateX(100%)",
          },
          "100%": {
            /*          opacity: "100", */
            transform: "translateY(0px)",
          },
        },
        slideUpLeave: {
          "0%": {
            /*             opacity: "100", */
            transform: "translateY(0)",
          },
          "100%": {
            /*             opacity: "0", */
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
        slideUpEnter: "slideUpEnter .7s ease-in-out",
        slideUpLeave: "slideUpLeave .7s ease-in-out",
        updown: "upDown 2s infinite",
        skeleton: "skeleton 2.1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },

      transitionDuration: {
        slow: "700ms",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
