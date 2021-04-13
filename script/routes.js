const Html = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');



function getRoutes() {
  const routes = fs.readdirSync(path.resolve(__dirname, '../src/pages')).filter(i => /^[^\.]+$/.test(i));
  const entry = {
    'global': './src/.assets/script/index',
    'main': './src/pages/main',
  }, html = [
    new Html({
      template: `./src/pages/index.html`,
      filename: `index.html`,
      chunks: ['global', 'main'], // 对应 entry 的键， 从而引入 script
      showErrors: process.env.GLOBAL_ENV !== 'prod',
    })
  ];

  routes.forEach(i => {
      html.push(new Html({
        template: `./src/pages/${i}/index.html`,
        filename: `${i}/index.html`,
        chunks: ['global', i],
        showErrors: process.env.GLOBAL_ENV !== 'prod',
      }));
      entry[i] = `./src/pages/${i}/index`;
  })
  return {
    entry,
    html,
  }
}

module.exports = getRoutes();