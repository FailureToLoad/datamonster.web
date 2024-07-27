import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#ffffff",
            foreground: "#000000",
            primary: {
              DEFAULT: "#6B7280",
              foreground: "#ffffff",
            },
            secondary: {
              DEFAULT: "#0792FC",
              foreground: "#ffffff",
            },
            success: {
              DEFAULT: "#36C164",
              foreground: "#ffffff",
            },
            warning: {
              DEFAULT: "#DB9729",
              foreground: "#ffffff",
            },
            danger: {
              DEFAULT: "#FF6159",
              foreground: "#ffffff",
            },
            focus: "#4433FF",
          },
        },
        dark: {
          colors: {
            background: "#000000",
            foreground: "#ffffff",
            primary: {
              DEFAULT: "#6B7280",
              foreground: "#000000",
            },
            secondary: {
              DEFAULT: "#0792FC",
              foreground: "#000000",
            },
            success: {
              DEFAULT: "#36C164",
              foreground: "#000000",
            },
            warning: {
              DEFAULT: "#DB9729",
              foreground: "#000000",
            },
            danger: {
              DEFAULT: "#FF6159",
              foreground: "#000000",
            },
            focus: "#4433FF",
          },
          // ... rest of the colors
        },
      },
    }),
  ],
};
