var path = require('path');
var rucksack = require('rucksack-css');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var virgin = require('virgin');

var conf = require('./config/' + (virgin.confName || 'base'));
var isPro = process.env.NODE_ENV === 'production';

var bundleName = '[name]_bundle.js';
var chunkName = '[name]_chunk.js';
var baseStatic = conf.baseUrl + conf.staticPath;

var distFileName = 'dev';
if (isPro) {
  distFileName = 'pro';
}
var outputPath = path.join(__dirname, conf.webpack.indexDir + conf.staticPath + '/' + distFileName);
var publicPath = baseStatic + '/' + distFileName;

// ***************************** plugins *****************************
var plugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.ProvidePlugin({
    React : 'react'
  }),
  new webpack.optimize.CommonsChunkPlugin("vendor", bundleName),//提取公共模块
  new webpack.DefinePlugin({
    'process.env': {//React 要用的变量。
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }),
  // create index.html
  new HtmlWebpackPlugin({
    filename: path.join(__dirname, conf.webpack.indexDir + '/index.html'),
    template: path.join(__dirname, '/src/index.ejs'),
    //tpl option
    baseUrl:conf.baseUrl,
    baseStatic
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
    app: "./app.jsx",
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
    path: outputPath,
    publicPath,
    filename: bundleName,
    chunkFilename: chunkName
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
    },
    {test: /\.md$/, loaders: ['html', 'markdown']},
    {test: /\.css$/, loaders: ['style', 'css']},
    {test: /\.html$/,loaders: ['html']},
     {
      test: /\.scss$/,
      loaders: [
        "style",
        "css?modules&importLoaders=1&localIdentName=[local]_[hash:base64:5]",
        "postcss",
        "sass"
      ]
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      //'clear': 'virgin'
    }
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],
  plugins: plugins,
  devServer: {
    contentBase: path.join(__dirname, conf.webpack.indexDir),
    hot: true
  }
};
