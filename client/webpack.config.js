module.exports = {
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader',
  ],
  output: {
    crossOriginLoading: 'anonymous',
  },
  devtool: 'cheap-module-source-map ',
};
