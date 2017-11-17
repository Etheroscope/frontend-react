const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'BACKEND_BASE_URL': JSON.stringify('http://localhost:3000')
    })
  ],
  devtool: 'eval-source-map',
  output: {
    pathinfo: true
  },
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    inline: true,
    historyApiFallback: true
  }
};
