const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'BACKEND_BASE_URL': JSON.stringify('http://staging-api.etheroscope.info')
    })
  ],
  devtool: 'source-map'
};
