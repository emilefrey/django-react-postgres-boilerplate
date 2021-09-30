const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.dev.json"
          }
        }],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|mp3)$/,
        use: [{ loader: 'file-loader', options: { name: "[name].[ext]" } }] // ?name=[name].[ext] is only necessary to preserve the original file name
      }
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx", ".css"],
  },
  output: {
    chunkFilename: (pathData) => {
      return pathData.chunk.name === 'main' ? '[name].js' : 'chunks/[name].js';
    },
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]-[chunkhash].js",
    publicPath: "/",
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "StarterApp",
      template: path.resolve(__dirname, "./index.html"),
      path: path.resolve(__dirname, "./dist"),
      // favicon: path.resolve(__dirname, "./static/favicon.ico"),
    }),
  ]
};