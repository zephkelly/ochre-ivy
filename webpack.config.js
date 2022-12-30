const path = require('path');
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: [
    './src/style.css',
    './src/app.js',
    './src/routes/posts.js'
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
      template: './src/template-index.html',
      clean: true,
    }),

    new CopyPlugin({
      patterns: [
        { from: "server.js", to: "server.js" }
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