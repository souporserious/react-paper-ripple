var path = require('path')
var webpack = require('webpack')
var TARGET = process.env.TARGET || null

const externals = {
  react: {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react',
  },
  'prop-types': {
    root: 'PropTypes',
    commonjs2: 'prop-types',
    commonjs: 'prop-types',
    amd: 'prop-types',
  },
  'react-motion': {
    root: 'ReactMotion',
    commonjs2: 'react-motion',
    commonjs: 'react-motion',
    amd: 'react-motion',
  },
}

var config = {
  entry: {
    index: './src/react-paper-ripple.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'react-paper-ripple.js',
    sourceMapFilename: 'react-paper-ripple.sourcemap.js',
    library: 'ReactPaperRipple',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
  plugins: [],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  externals: externals,
}

if (TARGET === 'minify') {
  config.output.filename = 'react-paper-ripple.min.js'
  config.output.sourceMapFilename = 'react-paper-ripple.min.js'
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      mangle: {
        except: ['React', 'ReactDOM', 'ReactMotion', 'ReactPaperRipple'],
      },
    })
  )
}

module.exports = config
