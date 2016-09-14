var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, './'),
  entry: './node_field/react_lib',
  output: {
    path: './static/dev_dist',
    filename: 'react_lib_bundle.js'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loaders: [
        'babel-loader'
      ]
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {//React 要用的变量。
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  ]
};
