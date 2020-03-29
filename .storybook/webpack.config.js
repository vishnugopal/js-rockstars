// .storybook/webpack.config.js

const path = require("path");

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("babel-loader"),
    options: {
      presets: [require.resolve("babel-preset-react-app")]
    }
  });

  const revisedPostCssRule = {
    loader: "postcss-loader",
    options: {
      /*
        Enable Source Maps
       */
      sourceMap: true,
      /*
        Set postcss.config.js config path && ctx
       */
      config: {
        path: "./.storybook/postcss.config.js"
      }
    }
  };

  /**
   * Custom PostCSS config as Next's postcss.config.js
   * doesn't play well with Storybook's
   */
  const cssRule = config.module.rules.filter(rule => {
    return rule.test.toString() == "/\\.css$/";
  })[0];
  const postCssRule = cssRule.use.filter(use => {
    return use.loader && use.loader.match(/postcss/);
  })[0];
  postCssRule.options.config.path = "./.storybook/postcss.config.js";

  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};
