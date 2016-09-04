var path = require('path');
var conf = require('./script/conf');
var rucksack = require('rucksack-css');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');



var isPro = process.env.NODE_ENV === 'production';
var bundle_name = '[name]_bundle.js';
var chunk_name = '[name]_chunk.js';
var index_path = '/index.html';
var publicPath = conf.outPutDir;


if (isPro) {
  publicPath = '/clear';
  index_path = conf.outPutDir + '/index.html';
  //bundle_name = '[name]_bundle_[chunkhash].js';
  //chunk_name = '[name]_chunk_[chunkhash].js';
}

// ***************************** plugins *****************************
var plugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.ProvidePlugin({
    React : 'react'
  }),
  new webpack.optimize.CommonsChunkPlugin("vendor", bundle_name),

  new webpack.DefinePlugin({
    'process.env': {//React 要用的变量。
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
  }
  }),
  // create index.html
  new HtmlWebpackPlugin({
    ROOT_PATH: publicPath,
    filename: path.join(__dirname, index_path),
    template: path.join(__dirname, '/src/index.ejs')
  })
]

if (isPro) { //正式环境下压缩
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      sourceMap: false,
      output: {
        comments: false,
      },
    }));
};

// ***************************** conf *****************************

module.exports = {
  context: path.join(__dirname, './src'),
  entry: {
    app: "./index.jsx",
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
    path: path.join(__dirname, conf.outPutDir , conf.outPutFile),
    publicPath: publicPath + '/' + conf.outPutFile,
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
    extensions: ['', '.js', '.jsx'],
    alias: {
      'clear': 'virgin'
    }
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],
  plugins: plugins,
  devServer: {
    contentBase: './',
    hot: true
  }
};
