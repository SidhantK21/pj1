const defaultTheme = require("tailwindcss/defaultTheme");
const { colors } = require("tailwindcss/colors");
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class", // or 'media' if you prefer
  theme: {
    extend: {
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
        xl: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      keyframes: {
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },
      colors: {
        gray: {
          900: '#1a202c',
          700: '#2d3748',
          500: '#718096',
          400: '#a0aec0',
        },
      },
    },
  },
  plugins: [
    require("daisyui"),

    function({ addBase, theme }) {
      const allColors = flattenColorPalette(theme("colors"));

      const lightThemeColors = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
      );

      const darkThemeColors = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--dark-${key}`, val])
      );

      addBase({
        ":root": lightThemeColors,
        ".dark": darkThemeColors,
      });
    },
  ],
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "light", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
