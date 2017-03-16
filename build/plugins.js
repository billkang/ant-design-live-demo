const webpack = require('webpack');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const plugins = [
  new CommonsChunkPlugin({
    name: 'vendor',
    filename: 'js/[name].[hash:6].js'
  }),
  new webpack.HashedModuleIdsPlugin(),
  new WebpackChunkHash(),
  new ChunkManifestPlugin({
    filename: 'chunk-manifest.json',
    manifestVariable: 'webpackManifest'
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
    title: 'ant-design-live-demo',
    filename: 'index.html',
    template: './src/index.ejs',
    minify: {
      removeAttributeQuotes: true,
    },
  })
];

module.exports = plugins;
