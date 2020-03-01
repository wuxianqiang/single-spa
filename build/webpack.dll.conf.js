const webpack = require('webpack')
const path = require('path')
const dir = process.cwd()

module.exports = {
  mode: 'production',
  entry: {
    vendor: ['vue', 'vuex', 'vue-router']
  },
  output: {
    library:  'familybucket',
    filename: '[name].dll.js'
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'familybucket',
      path: path.resolve(dir, 'manifest.json')
    })
  ]
}
