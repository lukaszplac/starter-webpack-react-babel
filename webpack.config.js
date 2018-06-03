const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  let cssLoader = {
    minimize: false
  };
  if (argv.mode === 'production') cssLoader = {
    minimize: true
  }

  return {
    devtool: argv.mode === 'production' ? 'none' : 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader'
          }
        },
        {
          test: /\.scss$/,
          use: [
            argv.mode !== 'production'? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                ...cssLoader,
                importLoaders: 1,
                modules: true,
                localIdentName: '[name]__[local]__[hash:base:64:5]'
              }
            },
            "postcss-loader",
            "sass-loader"
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin(
        {
          template: "./src/index.html",
          filename: "./index.html"
        }
      ),
      new MiniCssExtractPlugin(
        {
          filename: "./css/[name].css",
          chunkFilename: "[id].css"
        })
    ]
  }
  };