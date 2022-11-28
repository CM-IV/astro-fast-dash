const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    purgecss({
      content: ["./**/*.astro", "./src/**/*.tsx"],
    }),
  ],
};
