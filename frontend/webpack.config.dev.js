const webpack = require("webpack");
const path = require("path");
var config = require('./webpack.config.base.js')


config.entry = path.resolve(__dirname, "./src/index.js")

config.devServer = {
  host: '0.0.0.0',
  disableHostCheck: true,
  port: 3000,
  contentBase: path.resolve(__dirname, "./dist"),
  hot: true,
  historyApiFallback: true,
  inline: true,
  overlay: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  }
}

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  })
])

config.mode = "development"

module.exports = config