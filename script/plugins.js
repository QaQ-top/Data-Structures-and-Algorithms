const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebPack = require('webpack');
const { html } = require('./routes');


module.exports = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    linkType: 'text/css',
    filename: 'css/[name].[chunkhash].css'
  }),
  new WebPack.DefinePlugin({
    GLOBAL_ENV: JSON.stringify(process.env.GLOBAL_ENV),
  }),
  ...html,
]