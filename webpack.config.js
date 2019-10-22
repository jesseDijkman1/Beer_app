const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/main.ts',
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        }
      }
    ]
  }
}