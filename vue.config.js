const path = require('path')

module.exports = {
  pwa: {
    name: 'Circular',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    /* workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'dev/sw.js',
      // ...other Workbox options...
    } */
  },
  devServer: {
    open: process.platform === 'darwin',
    host: '127.0.0.1',
    port: 8083, // CHANGE YOUR PORT HERE!
    https: false,
    hotOnly: false
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/circular/'
    : '/circular/',
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
