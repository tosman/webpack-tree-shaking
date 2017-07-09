// webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
module.exports = function() {
  const isProd = process.env.NODE_ENV === "prod";

  plugins = [new HtmlWebpackPlugin({ title: "Tree-shaking" })];

  if (isProd) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
           minimize: true,
           mangle: false
      })
    );
  }
  return {
    entry: "./src/index.js",
    output: {
      filename: "bundle.js",
      path: __dirname + "/.dist"
    },
    devtool: isProd ? 'false': 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: [["es2015", { modules: false }]] // Setting modules to false is essential for tree-shaking
          }
        }
      ]
    },
    plugins
  };
};
