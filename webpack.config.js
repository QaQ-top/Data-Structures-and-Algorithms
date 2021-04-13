
const loader = require('./script/loader');
const plugins = require('./script/plugins');
const { entry } = require('./script/routes');
const  { resolve } = require('./script/path');
// 代码压缩
const  TerserPlugin = require('terser-webpack-plugin');
// umi.js 的 TerserJS 默认配置
const  DefaultOptions = require('./script/terser_options');

const path = require('path');

module.exports = {
  mode: "development",
  // 入口
  entry,
  // 出口
  output: {
    filename: 'js/[name].[chunkhash].js', // 推荐使用 chunkhash 而不是 hash
    path: path.resolve(__dirname, './dist')
  },
  // 生成原文件映射, 方便开发
  devtool: process.env.GLOBAL_ENV === 'prod' ? 'eval' : 'eval-source-map',

  // 代码压缩混淆
  optimization: {
    minimize: process.env.GLOBAL_ENV === 'prod',
    minimizer: [new TerserPlugin({
      terserOptions: DefaultOptions
    })],
  },
  resolve,
  module: {
    rules: loader,
  },
  plugins,
}