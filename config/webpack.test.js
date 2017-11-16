const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'BACKEND_BASE_URL': JSON.stringify('http://test-api.etheroscope.info')
    })
  ],
  devtool: 'eval-source-map'
};
