
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');

module.exports = [
  {
    test: /\.(sass|scss)?$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'sass-loader'
    ]

  },
  {
    test: /\.(less)?$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'less-loader'
    ]
  },
  {
    test: /\.(css)?$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
    ]
  },
  {
    test: /\.(tsx)?$/,
    use: [
      'babel-loader',
      'ts-loader',
    ]
  },
  {
    test: /\.(ts)?$/,
    loader: 'ts-loader'
  },
  {
    test: /\.(js)?$/,
    loader: 'babel-loader',
    exclude: '/node_modules/'
  },
  {
    test: /\.(png|jpg|gif|svg)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000, // 图片字节大小
          outputPath:'./images',
          name: '[name]_[hash].[ext]',
        },
      },
    ],
  },
]