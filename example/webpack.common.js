const iCrushLoaderPlugin = require('icrush-loader-plug');

module.exports = {
  entry: ['./src/entry.js'],
  output: {
    path: __dirname,
    filename: 'build/main.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }, {
      test: /\.iCrush$/,
      exclude: /node_modules/,
      loader: ['icrush-loader']
    }, {
      test: /\.(png|jpg|jpeg|gif|bmp)$/,
      loader: [{
        loader: "url-loader",
        options: {
          name: "build/[path][name].[ext]",
          context: "src/asset",
          limit: 5000
        }
      }]
    }, {
      test: /\.css$/,
      loader: ['icrush-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
    }]
  },
  plugins: [
    new iCrushLoaderPlugin()
  ]
};