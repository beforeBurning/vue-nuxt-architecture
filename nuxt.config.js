export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'vue-nuxt-architecture',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0' },
      { hid: 'description', name: 'description', content: '全局 Meta description' },
      { hid: 'keywords', name: 'keywords', content: '全局 Meta keywords' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    // 公共less文件
    '@/assets/less/global.less',
    // 清楚默认样式
    'normalize.css',
    // 字体文件
    '@/assets/fonts/iconfont.css'
  ],

  // 路由中间件
  router: {
    middleware: 'auth'
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/route',
    // ssr: Boolean (默认为 true) 若是值为 false，该文件只会在客户端被打包引入
    { src: '@/assets/fonts/iconfont.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
    // 表示开启代理
    proxy: true,
    // 表示跨域请求时是否需要使用凭证
    credentials: true
  },

  proxy: {
    '/api': {
      // 目标接口域名
      target: 'http://www.baidu.com/api',
      // 表示是否跨域
      changeOrigin: true,
      pathRewrite: {
        // 打包时把 /api 替换成 ''
        '^/api': ''
      }
    }
  },

  // js 自动创建文件，并引用
  hooks: {
    'vue-renderer:ssr:context' (context) {
      const routePath = JSON.stringify(context.nuxt.routePath)
      context.nuxt = { serverRendered: true, routePath }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    // css 自动创建文件，并引用
    extractCSS: { allChunks: true },
    styleResources: {
      less: './assets/less/global.less'
    }
  }

}
