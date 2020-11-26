var utils = require('./utils');
var webpack = require("webpack");
var config = require('../config')
var path = require('path')
var env = config.build.env
module.exports = {
  entry: {
    index: './index.js',
  },
  output: {
    path: config.build.assetsRoot,
    library: 'vue-layer-map',
    filename: 'vue-layer-map.js',
    libraryTarget: 'umd',
    // filename: utils.assetsPath('js/[name].js'),
    // chunkFilename: utils.assetsPath('js/[id].js')
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue'
    }
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      },
      exclude: /node_modules/
    }, {
      test: /\.less$/,
      loader: "style!css!less"
    }]
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': env
    // }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: function (module, count) {
    //     // any required modules inside node_modules are extracted to vendor
    //     return (
    //       module.resource &&
    //       /\.js$/.test(module.resource) &&
    //       module.resource.indexOf(
    //         path.join(__dirname, '../node_modules')
    //       ) === 0
    //     )
    //   }
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   chunks: ['vendor']
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    // new webpack.ProvidePlugin({//打包第三方库
    //       vue: 'vue'
    //   }),
    // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js', Infinity),
  ],
}
