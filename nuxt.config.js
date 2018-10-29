const pkg = require('./package')

module.exports = {
  mode: 'universal',
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#fff' },
  css: [],
  plugins: [],
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '~/tools/typescript.js'
  ],
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  build: {
    extractCSS: true,
    cssSourceMap: true,
    extend(config, ctx) {
      // config.module.rules.push({
      //   test: /\.(js|ts)$/,
      //   loader: 'ts-loader',
      //   exclude: /(node_modules)/,
      //   options: {
      //     // transpileOnly: true,
      //     appendTsSuffixTo: [/\.vue$/]
      //   }
      // })
    }
  }
}
