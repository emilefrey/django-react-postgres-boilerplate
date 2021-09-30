const webpack = require("webpack");
const path = require("path");
var config = require('./webpack.config.base.js')

config.devServer = {
  host: '0.0.0.0',
  overlay: true,
  disableHostCheck: true,
  port: 3000,
  contentBase: path.resolve(__dirname, "./dist"),
  hot: true,
  historyApiFallback: true,
  publicPath: "/"
}

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  })
])

config.devtool = "inline-source-map"

config.mode = "development"

module.exports = config