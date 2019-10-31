const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const SRC_DIR = path.join(__dirname, 'src');

const indexCss = new ExtractTextPlugin('index.css');

const argv = require('minimist')(process.argv.slice(2));
const targetOption = argv.target;
// const output = targetOption === 'web' ? 'build/web' : 'build/electron';
const BUILD_DIR = path.join(__dirname, 'build');

const options = {
  // entry: { test: ['babel-polyfill', './index.js'] },
  entry: './index.js',
  target: targetOption,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    pathinfo: false,
  },
  node: {
    fs: 'empty',
    __dirname: false,
    __filename: false,
  },
  context: SRC_DIR,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    indexCss,
    new HtmlWebpackPlugin({
      title: 'App',
      filename: 'index.html',
      template: 'public/index.html',
      // chunks: ['test'],
    }),
    new CopyWebpackPlugin(['public']),
  ],
  module: {
    rules: [
      // { 
      //   test: /\.ts$/, 
      //   exclude: /node-modules/, 
      //   use: 'babel-loader' 
      // },
      { 
        test: /\.tsx?$/, 
        exclude: /node-modules/, 
        use: 'babel-loader' 
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          }
        ]
      },
      {
        test: /index.css$/,
        use: indexCss.extract({
          use: 'css-loader',
        }),
      },
    ],
  },
};
module.exports = options;
