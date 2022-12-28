const path = require('path');
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    style: './src/style.css',
    index: './index.js', 
    posts: './src/routes/posts.js'
  },
  output: {
    filename: '[name].bundle.js',
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
      title: 'Webpack',
      template: './src/template-index.html'
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
},};