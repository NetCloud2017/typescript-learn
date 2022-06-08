/**
 * @type {import('webpack').Configuration}
 */

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const prodConfig = require("./webpack.prod.js");
const devConfig = require("./webpack.dev.js");
const baseConfig = require("./webpack.base.js");
const { readdirSync } = require("fs");
const { resolve } = require("path");

module.exports = (env) => {
  const config = {
    mode: env.production ? "production" : "development",
    entry: readdirSync(resolve(__dirname, "../src")).map(filepath => "./src/" + filepath),
    output: {
      clean: true,
      path: resolve(__dirname, "../dist"),
      filename: "[name][numeric].[contenthash:5].js",
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          exclude: "/node_modules",
          test: /\.tsx?$/i,
          use: {
            loader: "ts-loader",
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "../index.html",
      }),
    ],
  };
  return merge(config, baseConfig, env.production ? prodConfig : devConfig);
};
