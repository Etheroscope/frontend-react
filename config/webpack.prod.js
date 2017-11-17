const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'BACKEND_BASE_URL': JSON.stringify('http://production-api.etheroscope.info')
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      quiet: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        screw_ie8: true, // eslint-disable-line
        warnings: false,
      }
    }),
  ],
  devtool: 'none'
};
