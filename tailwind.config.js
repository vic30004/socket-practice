module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    height: (theme) => ({
      "screen/2": "50vh",
      "screen/3": "calc(100vh / 3)",
      "screen/4": "calc(100vh / 4)",
      "screen/5": "calc(100vh / 5)",
      "full": "100%",
    }),
  },
  variants: {
    display: ["responsive", "hover", "focus"],
  },
  plugins: [],
};
