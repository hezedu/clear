var path = require('path');
var rucksack = require('rucksack-css');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var confName = process.env.NODE_BUILD_CONF_NAME || 'dev';
var conf = require('./config/' + confName);

var isPro = process.env.NODE_ENV === 'production';
var bundleName = conf.bundleName;
var chunkName = conf.chunkName;

var baseStatic;
if(/(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?/.test(conf.staticPath)) { //是否为URL.
  baseStatic = conf.staticPath;
}else{
  baseStatic  = conf.baseUrl + conf.staticPath;
}

var outputPath = path.join(__dirname, conf.indexDir + conf.staticPath + '/' + confName);
var publicPath = baseStatic + '/' + confName;

var indexData = conf.indexData || {};
indexData.BASE_URL = conf.baseUrl;
indexData.BASE_STATIC = baseStatic;

// ***************************** plugins *****************************
var plugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.ProvidePlugin({//不用在每个文件里import React from 'react'了
    React : 'react'
  }),
  new webpack.optimize.CommonsChunkPlugin("a_vendor", bundleName),//提取公共模块
  new webpack.DefinePlugin({
    'process.env': {//React 要用的变量。
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }),
  // create index.html
  new HtmlWebpackPlugin({
    filename: path.join(__dirname, conf.indexDir + '/index.html'),
    template: path.join(__dirname, '/src/index.ejs'),
    //tpl option
    indexData
  })
]
// ***************************** 环境适配 *****************************
var jsxLoader = [
  'react-hot',
  'babel-loader'
];
if (isPro) {
  jsxLoader.shift(); //正式环境不加载 react-hot-loader, 可以节省文件大小。

  plugins.push(//正式环境下压缩
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
  entry: { //使用开头字母排序，防止vendor随着app代玛改变而改变。https://github.com/webpack/webpack/issues/1315#issuecomment-247269598
    a_vendor: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
      //'react-router-redux',
    ],
    z_app: "./app.jsx"
  },
  output: {
    path: outputPath,
    publicPath,
    filename: bundleName,
    chunkFilename: chunkName
  },
  module: {
    preLoaders: [ //代码检查
        {
          test: /\.(js|jsx)$/,
          loader: 'eslint-loader',
          include: [path.resolve(__dirname, "src")],
          exclude: [/(node_modules|bower_components)/]
        }
    ],
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loaders: jsxLoader
    },
    {test: /\.css$/, loaders: ['style', 'css']},
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
    }
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],
  plugins: plugins,
  devServer: {
    contentBase: path.join(__dirname, conf.indexDir),
    hot: true
  }
};
