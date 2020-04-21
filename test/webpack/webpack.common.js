const path = require("path");
const iCrushLoaderPlugin = require('../../webpack/icrush-loader-plug');

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
      use: ['../../webpack/icrush-loader.js']
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
      loader: ['style-loader', '../../webpack/icrush-style-loader.js', 'css-loader', 'postcss-loader']
    }]
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "iCrush": path.join(process.cwd(), "../../dist/iCrush.babel.js")
    }
  },
  plugins: [
    new iCrushLoaderPlugin()
  ]
};
