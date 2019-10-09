const path = require('path')

module.exports = {
  chainWebpack: (config) => {
    config.module.rules.delete('eslint');
  },
  outputDir: path.resolve(__dirname , '../server/public'),
    devServer: {
        proxy: {
            '/Api': {
                target: 'http://localhost:8081'
            }
        }
    }, 
    pwa: {
      iconPaths: {
         favicon32: 'img/icons/favicon.ico',
      }
    }
};
