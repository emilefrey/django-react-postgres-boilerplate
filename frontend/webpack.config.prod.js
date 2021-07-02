const webpack = require("webpack");
var config = require('./webpack.config.base.js')

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  })
])

config.mode = "production"

module.exports = config