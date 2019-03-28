import messages from './locales'

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
  loading: { color: '#fff' },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  // proxy: {
  //   // redirects all request from '/api' to this url
  //   '/api': 'http://your-api-base-url.com'
  // },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sitemap',
    '@nuxtjs/proxy',
    ['nuxt-i18n', {
      parsePages: false,
      locales: [
        { name: 'Russian', code: 'ru', iso: 'ru-RU', file: 'ru-RU' },
        { name: 'English', code: 'en', iso: 'en-US', file: 'en-US' }
      ],
      langDir: 'locales/',
      defaultLocale: 'ru',
      detectBrowserLanguage: {
        useCookie: true,
        alwaysRedirect: false,
        cookieKey: 'i18n_redirected'
      },
      vueI18n: {
        messages
      }
    }]
  ],
  plugins: [
    { src: '@/plugins/intersectionObserver.ts', ssr: false },
    { src: '@/plugins/viewportSizeHandler.ts', ssr: false },
    { src: '@/plugins/clientParametersHandler.ts', ssr: false },
    { src: '@/plugins/svgxuse.ts', ssr: false },
    { src: '@/plugins/keyboardHandler.ts', ssr: false },
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
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  generate: {
    dir: 'www'
  },
  build: {
    transpile: ['lodash-es'],
    extend(config) {
      config.bail = true
    },
    extractCSS: true,
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
    }
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
  // sentry: {
  //   dsn: '', // Enter your project's DSN here
  //   config: {}, // Additional config
  // }
}
