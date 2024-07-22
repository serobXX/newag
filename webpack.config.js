const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.common')

module.exports = merge(baseConfig,{
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new BundleAnalyzerPlugin({openAnalyzer: false})
  ],
});
