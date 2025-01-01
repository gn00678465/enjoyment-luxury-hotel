// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  extends: [
    'assets',
  ],
  modules: [
    ['@pinia/nuxt', {
      autoImports: ['defineStore', 'acceptHMRUpdate'],
    }],
    '@nuxt/eslint',
    '@unocss/nuxt',
    '@nuxt/icon',
    '@nuxtjs/google-fonts',
    '@vite-pwa/nuxt',
    'nuxt-viewport',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxtjs/sitemap',
  ],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  imports: {
    dirs: ['stores'],
  },
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },

  css: ['@unocss/reset/tailwind.css'],
  runtimeConfig: {
    app: {
      apiUrl: '',
    },
  },
  compatibilityDate: '2024-11-01',

  eslint: {
    config: {
      stylistic: {
        semi: true,
      },
    },
  },

  googleFonts: {
    useStylesheet: true,
    preload: true,
    families: {
      'Noto+Serif+TC': [200, 300, 400, 500, 600, 700, 800, 900],
      'Fira+Code': true,
      'Fira+Mono': [400, 700],
    },
  },

  icon: {
    serverBundle: {
      externalizeIconsJson: true,
      collections: ['mdi'],
    },
  },

  // i18n: {
  //   langDir: 'locales',
  //   locales: [
  //     { code: 'zh-TW', file: 'zh-TW.json' },
  //   ],
  //   defaultLocale: 'zh-TW',
  //   strategy: 'prefix_and_default',
  // },

  image: {
    format: ['webp', 'png'],
    screens: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
      xxxl: 1537,
    },
    presets: {
      avatar: {
        modifiers: {
          format: 'png',
          width: 144,
          height: 144,
        },
      },
    },
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/drhaq32ec/image/upload/',
    },
  },

  viewport: {
    breakpoints: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
      xxxl: 1537,
    },
    feature: 'minWidth',
  },
});
