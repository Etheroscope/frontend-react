const { resolve } = require('path')
const merge = require('webpack-merge')

module.exports = ({ NODE_ENV: env }) => {
  const configs = {
    production: 'prod',
    staging: 'staging',
    testing: 'test',
    development: 'dev'
  }
  const suffix = configs[env] || 'prod'
  const envConfig = require(`./config/webpack.${suffix}.js`)

  return merge(envConfig, {
    entry: './index.js',
    context: __dirname,
    output: {
      path: resolve(__dirname, './build'),
      filename: 'bundle.js',
      publicPath: '/build/',
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        { test: /(\.eot|\.woff2|\.woff|\.ttf|\.svg)/, loader: 'file-loader' },
      ],
    }
  });
};
