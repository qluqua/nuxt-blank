module.exports = {
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
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@/tools/typescript.js'
  ],
  plugins: [
    { src: '@/plugins/viewportSizeHandler.ts', ssr: false },
    { src: '@/plugins/clientParametersHandler.ts', ssr: false },
    { src: '@/plugins/svgxuse.ts', ssr: false }
  ],
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  vue: {
    config: {
      productionTip: false
    }
  },
  router: {
    scrollBehavior: function(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  // rootDir: './',
  // srcDir: 'src',
  // modulesDir: '../node_modules',
  generate: {
    dir: 'www'
  },
  build: {
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
  }
}
