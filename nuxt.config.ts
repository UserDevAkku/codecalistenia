// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: 'https://accounts.google.com/gsi/client',
          async: true,
          defer: true,
        },
      ],
      // Other head properties like title, meta, link can go here
    },
  },
  css: [
    '@/assets/bg/css/tailwind.css',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: [
    "nuxt-quasar-ui",
    "nuxt-mdi",
    "@nuxtjs/tailwindcss"
  ],

  mdi: {
    componentName: "Icon",
    defaultSize: "1em",
  },


  quasar: {
    plugins: [
      'BottomSheet',
      'Dialog',
      'Loading',
      'Notify',
      'Dark',
    ],
    extras: {
      font: 'roboto-font',
    },
    components: {
      defaults: {
        QBtn: {
          unelevated: true,
        },
      },
    },
  },

});
