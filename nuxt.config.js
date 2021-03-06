import path from 'path'
// import messages from './locales'

export default {
  mode: 'universal',
  head: {
    title: 'nuxt-blank',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'hid', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  css: ['@/styles/app.styl'],
  loading: { color: 'red' },
  axios: {
    // make true to enable dev proxy
    proxy: false
  },
  proxy: {
    '/api/': 'http://endpoint.url.dev.domain.com'
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sitemap',
    // ['nuxt-i18n', {
    //   parsePages: false,
    //   locales: [
    //     { name: 'Russian', code: 'ru', iso: 'ru-RU', file: 'ru-RU' },
    //     { name: 'English', code: 'en', iso: 'en-US', file: 'en-US' }
    //   ],
    //   lazy: true,
    //   langDir: 'locales/',
    //   defaultLocale: 'ru',
    //   detectBrowserLanguage: {
    //     useCookie: true,
    //     alwaysRedirect: false,
    //     cookieKey: 'i18n_redirected'
    //   },
    //   // vueI18n: {
    //   //   messages
    //   // }
    // }]
  ],
  plugins: [
    { src: '@/plugins/clientUiHandler', ssr: false },
    { src: '@/plugins/api' },
    { src: '@/plugins/svgxuse', ssr: false },
    // { src: '@/plugins/intersectionObserver', ssr: false },
    // { src: '@/plugins/keyboardHandler', ssr: false },
  ],
  vue: {
    config: {
      productionTip: false
    }
  },
  router: {
    middleware: ['routerHandler'],
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  server: {
    port: 3000,
    host: '0.0.0.0', // default: localhost
  },
  buildModules: ['@nuxt/typescript-build'],
  build: {
    extend(config, { isClient }) {
      // config.resolve.alias['@'] = path.resolve('.')
      config.bail = true
      config.output.filename = '[name].[hash].js'
      config.output.chunkFilename = '[name].[chunkhash].js'

      if (process.env.NODE_ENV === 'development' && isClient) {
        config.devtool = 'eval-source-map'
      }
    },
    extractCSS: process.env.NODE_ENV === 'production',
    hotMiddleware: {
      noInfo: true
    },
    html: {
      minify: {
        collapseBooleanAttributes: false,
        decodeEntities: false,
        minifyCSS: false,
        minifyJS: false,
        processConditionalComments: true,
        removeEmptyAttributes: false,
        removeRedundantAttributes: false,
        trimCustomFragments: false,
        useShortDoctype: false
      }
    },
  },
  // sitemap: {
  //   path: '/sitemap.xml',
  //   hostname: 'https://example.com',
  //   cacheTime: 1000 * 60 * 15,
  //   gzip: true,
  //   generate: true, // Enable me when using nuxt generate
  //   exclude: [
  //     '/secret',
  //     '/admin/**'
  //   ],
  //   routes: [
  //     '/page/1',
  //     {
  //       url: '/page/2',
  //       changefreq: 'daily',
  //       priority: 1,
  //       lastmodISO: '2017-06-30T13:30:00.000Z'
  //     }
  //   ]
  // },
}
