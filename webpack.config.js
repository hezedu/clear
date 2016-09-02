var rucksack = require('rucksack-css');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');


var isPro = process.env.NODE_ENV === 'production';
var bundle_name = '[name]_bundle.js';
var chunk_name = '[name]_chunk.js';
var index_path = '/index.html';

if (isPro) {
  bundle_name = '[name]_bundle_[chunkhash].js';
  chunk_name = '[name]_chunk_[chunkhash].js';
  index_path = '/dist/index.html';
}
// plugins
var plugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.ProvidePlugin({
    React : 'react'
  }),
  new webpack.optimize.CommonsChunkPlugin("vendor", bundle_name),
  new webpack.DefinePlugin({
    'IS_PRO': isPro,
    'process.env.NODE_ENV': process.env.NODE_ENV
  }),
  new HtmlWebpackPlugin({
    favicon: path.join(__dirname, 'favicon.png'),
    filename: path.join(__dirname, index_path),
    template: path.join(__dirname, '/src/index.ejs')
  })
]

if (isPro) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({ //压缩
      compress: {
        warnings: false,
      },
      sourceMap: false,
      output: {
        comments: false,
      },
    }));
};

// conf

module.exports = {
  context: path.join(__dirname, './src'),
  entry: {
    app: "./app",
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
      //'react-router-redux',
    ]
  },
  output: {
    path: './dist',
    publicPath: '/dist',
    filename: bundle_name,
    chunkFilename: chunk_name
  },
  module: {
    preLoaders: [
        {
          test: /\.(js|jsx)$/,
          loader: 'eslint-loader',
          include: [path.resolve(__dirname, "src")],
          exclude: [/(node_modules|bower_components)/] // galaxy|checkin 历史代码
        }
    ],
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loaders: [
        'react-hot',
        'babel-loader'
      ]
    }, {
      test: /\.scss$/,
      loaders: [
        "style",
        "css?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]",
        "postcss",
        "sass"
      ]
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],
  plugins: plugins,
  devServer: {
    hot: true
  }
};
