var path = require('path')

const PATHS = {
    build: `${__dirname}/build`,
    dist: `${__dirname}/dist`,
    src: `${__dirname}/src`
  }

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    resolve: {
        alias: {
          'layouts': PATHS.src + '/layouts',
          'scenes': PATHS.src + '/scenes'
        },
        symlinks: false
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react', 'stage-3']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
}
