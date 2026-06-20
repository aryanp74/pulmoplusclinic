/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        pulmoplus: {
          cream: "#F7F4EF",
          white: "#FFFFFF",
          mist: "#EEF7F7",
          pale: "#E8F1F4",
          teal: "#0F6F78",
          blue: "#2B7C91",
          cyan: "#9EDFE3",
          green: "#7BAE8F",
          coral: "#E79A8B",
          sand: "#D8C4A4",
          charcoal: "#1D2B2E",
          slate: "#536B70",
          muted: "#789097",
          line: "#D9E7E9"
        }
      },
      fontFamily: {
        sans: [
          "Inter",
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      },
      boxShadow: {
        soft: "0 24px 80px rgba(15, 111, 120, 0.12)",
        lift: "0 18px 50px rgba(29, 43, 46, 0.12)"
      },
      borderRadius: {
        soft: "8px"
      },
      keyframes: {
        breathe: {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "0.78"
          },
          "50%": {
            transform: "scale(1.045)",
            opacity: "1"
          }
        },
        rise: {
          "0%": {
            opacity: "0",
            transform: "translateY(18px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        wave: {
          "0%": {
            strokeDashoffset: "220"
          },
          "100%": {
            strokeDashoffset: "0"
          }
        }
      },
      animation: {
        breathe: "breathe 8s ease-in-out infinite",
        rise: "rise 700ms ease-out both",
        wave: "wave 1400ms ease-out both"
      }
    }
  },
  plugins: []
};