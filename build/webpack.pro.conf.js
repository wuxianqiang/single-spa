const webpack = require('webpack')
const path = require('path')
const Merge = require('webpack-merge')
const dir = process.cwd()
const baseConfig = require('./webpack.base.conf')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = Merge(baseConfig, {
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new UglifyJsPlugin()
    ]
  },
  mode: 'production',
  output: {
    filename: 'js/[name]_[hash].js',
    path: path.resolve(dir, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpe?g)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'img/[name].[hash:7].[ext]',
          publicPath: '/',
          esModule: false
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[hash:7].[ext]',
          esModule: false
        }
      },
      {
        test: /\.(css|less)$/,
        loaders: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              insertAt: 'top'
            }
          },
          {
            loader: 'css-loader',
            options: { importLoaders: 2 }
          },
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  devtool: 'cheap-source-map',
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('production')
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!vendor.dll.js']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:7].css'
    })
  ]
})
