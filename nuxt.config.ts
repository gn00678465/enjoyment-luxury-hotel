import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  extends: [
    'assets',
  ],

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('swiper-')
    }
  },

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

  alias: {
    '@enjoyment-luxury-hotel/shared/unocss': './packages/shared/libs/unocss/index.ts',
    '@enjoyment-luxury-hotel/shared/components': './packages/shared/libs/components/index.ts',
    '@enjoyment-luxury-hotel/shared/compoables': './packages/shared/libs/compoables/index.ts',
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
      collections: ['bi', 'mdi', 'ic', 'fluent']
    }
  },

  i18n: {
    langDir: 'locales',
    locales: [
      { code: 'zh-TW', file: 'zh-TW.json' },
      { code: 'en-US', file: 'en-US.json' },
    ],
    defaultLocale: 'zh-TW',
    strategy: 'prefix_and_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lang',
      cookieSecure: true
    }
  },

  image: {
    format: ['webp', 'png'],
    screens: {
      'xs': 375,
      'sm': 576,
      'md': 768,
      'lg': 992,
      'xl': 1200,
      '2xl': 1400,
      '3xl': 1537,
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
    provider: 'cloudinary',
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/drhaq32ec/image/upload/',
      modifiers: {
        effect: 'sharpen:100',
        quality: 'auto:best',
      },
    },
  },

  viewport: {
    breakpoints: {
      'xs': 375,
      'sm': 576,
      'md': 768,
      'lg': 992,
      'xl': 1200,
      '2xl': 1400,
      '3xl': 1537,
    },
    feature: 'minWidth',
    cookie: {
      expires: 365, // 365 days
      name: 'viewport',
      path: '/',
      sameSite: 'Strict',
      secure: true,
    },
  },

  vite: {
    plugins: [
      Icons({
        compiler: 'vue3',
        autoInstall: true,
        customCollections: {
          custom: FileSystemIconLoader('./assets/icons'),
        },
      }),
    ],
  }
});
