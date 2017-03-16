const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: process.cwd(),
  entry: {
    main: [
      './src/index.jsx'
    ]
  },
  output: {
    filename: 'js/[name].[chunkhash:6].js',
    chunkFilename: 'js/[name].[chunkhash:6].js',
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/'
  },
  resolve: {
    modules: [
      './src',
      './node_modules',
    ],
    extensions: ['.js', '.jsx', '.scss'],
  },
  devServer: {
    // enable HMR on the server
    hot: false,

    // match the output path
    contentBase: 'dist',

    // match the output `publicPath`
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract([
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ])
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract([
          { loader: 'css-loader' }
        ])
      }
    ]
  },
  plugins: [
    new CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/[name].[hash:6].js'
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash:6].css',
      disable: false,
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new HtmlWebpackPlugin({
      title: 'react-base-components',
      filename: 'index.html',
      template: './src/index.ejs',
      minify: {
        removeAttributeQuotes: true,
      },
    })
  ]
};
