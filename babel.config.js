module.exports = {
  presets: [
    ['@vue/babel-preset-jsx', {
        'injectH': false, // 关闭自动嵌入 代码 const h = arguments[0] 这个vue2.0的配置
      }
    ]
  ]
}