// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt', // required
    'pinia-plugin-persistedstate/nuxt'
  ],
  app: {
    head: {
      script: [{ src: "https://telegram.org/js/telegram-web-app.js" }]
    }
  },
  ssr: false,
  runtimeConfig: {
    public: {
      baseURL: "https://prodeli.teamnoco.de/api"
    }
  },
})
