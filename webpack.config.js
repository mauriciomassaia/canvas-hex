const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  target: 'web',
  entry: './src/scripts/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          plugins: [
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-transform-spread',
            '@babel/plugin-transform-async-to-generator'
          ],
          presets: ['@babel/preset-env']
        }
      }
    }, {
      test: /\.css$/,
      use: ['style-loader','css-loader']
    }, {
      loader: 'file-loader',
      test: /\.(png|jpg|gif|svg)$/,
      options: {
        name: '[name].[ext]?[hash]'
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'index.html',
      template: 'src/index.html'})
  ],
  externals: [ 'canvas' ],
  devtool: 'cheap-module-source-map'
}
