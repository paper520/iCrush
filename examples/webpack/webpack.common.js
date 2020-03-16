const path = require("path");

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
      test: /\.ic$/,
      exclude: /node_modules/,
      loader: [path.resolve(__dirname, '../../webpack/icrush-loader.js')] // 测试icrush-loader
    }, {
      test: /\.(png|jpg|jpeg|gif|bmp)$/,
      use: [{
        loader: "url-loader",
        options: {
          name: "build/[path][name].[ext]",
          context: "src/asset",
          limit: 5000
        }
      }]
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader']
    }]
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "iCrush": path.join(process.cwd(), "../../dist/iCrush.babel.js")
    }
  },
};
