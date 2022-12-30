const path = require('path');
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: [
    './src/client/style.css',
    './src/client/app.js',
    './src/client/modules/domInteraction.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/template-index.html',
      clean: true,
    }),

    new CopyPlugin({
      patterns: [
        { from: "./src/server/server.js", to: "server.js" },
      ],
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  
  module: {
    rules: [{
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    },],
  },
};