const plugins = ["tailwindcss"];
if (process.env.NODE_ENV === "production") {
  plugins.push([
    "@fullhuman/postcss-purgecss",
    {
      content: [
        "./pages/**/*.{js,jsx,ts,tsx}",
        "./src/components/**/*.{js,jsx,ts,tsx}",
        "./src/stories/**/*.{js,jsx,ts,tsx}"
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    }
  ]);
}

module.exports = {
  plugins
};
