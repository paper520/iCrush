const iCrushLoaderPlugin = require('../../icrush-loader-plug/index.js');
const resolve = require('path').resolve;

module.exports = {
  entry: ['./src/entry.js'],
  output: {
    path: __dirname,
    filename: 'build/main.js'
  },
  resolve: {
    alias: {
        'icrush': resolve(__dirname, '../../dist/iCrush.babel.js')
    }
},
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }, {
      test: /\.iCrush$/,
      exclude: /node_modules/,
      loader: ['../../icrush-loader/index.js']
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
      loader: ['../../icrush-style-loader/index.js', 'css-loader', 'postcss-loader']
    }]
  },
  plugins: [
    new iCrushLoaderPlugin()
  ]
};