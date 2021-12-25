module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ["'Raleway'", "sans-serif"],
        vollkorn: ["'Vollkorn'", "serif"],
      },
    },
  },
  plugins: [],
};
