const webpack = require('webpack')
const path = require('path')
const Merge = require('webpack-merge')
const dir = process.cwd()
const baseConfig = require('./webpack.base.conf')

module.exports = Merge(baseConfig, {
  mode: 'development',
  output: {
    filename: 'js/[name]_[hash].js',
    path: path.resolve(dir, 'dist')
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('development')
    })
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.vue$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        include: path.resolve(dir, 'src'),
        options: {
          formatter: require('eslint-friendly-formatter'),
          cache: true,
          emitWarning: true,
          emitError: true
        }
      },
      {
        test: /\.(png|svg|jpe?g)$/i,
        loader: 'url-loader',
        exclude: /node_modules/,
        include: path.resolve(dir, 'src'),
        options: {
          esModule: false
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: 'file-loader',
        exclude: /node_modules/,
        include: path.resolve(dir, 'src'),
        options: {
          esModule: false
        }
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        include: path.resolve(dir, 'src'),
        use: [
          {
            loader: 'style-loader',
            options: {}
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  devServer: {
    host: 'localhost',
    port: 8000,
    hot: true,
    open: true,
    overlay: {
      errors: true,
      warnings: true
    },
    contentBase: [path.resolve(dir, 'dist')],
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  cache: true
})
