module.exports = {
  purge: ["./pages/**/*.tsx", "./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        mirage: {
          default: "#1C1B2D",
          100: "#706CA7",
          200: "#58548C",
          300: "#44416C",
          400: "#302E4D",
          500: "#1C1B2D",
          600: "#08080D",
          700: "#000000",
          800: "#000000",
          900: "#000000",
        },
      },
    },
  },
  variants: {
    extend: {
      textColor: ["group-hover"],
      backgroundColor: ["disabled"],
      opacity: ["group-hover"],
      outline: ["hover", "active"],
      visibility: ["hover", "focus", "group-hover"],
    },
  },
  plugins: [],
};
