const iCrushLoaderPlugin = require('icrush/webpack/icrush-loader-plug');

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
      loader: ['icrush/webpack/icrush-loader.js']
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
      loader: ['style-loader', 'css-loader', 'postcss-loader']
    }]
  },
  plugins: [
    new iCrushLoaderPlugin()
  ]
};
