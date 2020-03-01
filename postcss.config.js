module.exports = ({ env }) => ({
  parser: false,
  plugins: {
    'postcss-preset-env': env === 'development' ? false : {},
    'cssnano': env === 'development' ? false: {}
  }
})
