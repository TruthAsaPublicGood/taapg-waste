const path = require('path')

module.exports = {
  devServer: {
    open: process.platform === 'darwin',
    host: '127.0.0.1',
    port: 8083, // CHANGE YOUR PORT HERE!
    https: false,
    hotOnly: false
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : './',
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
