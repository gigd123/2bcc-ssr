// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  vite: {
    define: {
      "process.env": process.env,
    },
  },

  components: {
    global: true,
    dirs: ["~/components/global", "stores"],
  },

  modules: [
    "@pinia/nuxt",
    "@nuxt/eslint",
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
  ],
  i18n: {
    strategy: "prefix_except_default", // prefix_except_default 表示網址除了 defaultLocale 語系外，都會帶上默認語系 param
    locales: [
      { code: "en", file: "en-US.json" },
      { code: "id", file: "id-ID.json" },
    ],
    langDir: "",
    defaultLocale: "id",
    // detectBrowserLanguage: {
    //   useCookie: true, // 啟用 cookie 儲存語系偏好
    //   cookieKey: "i18n_redirected", // 儲存語系偏好的 cookie 名稱
    //   alwaysRedirect: true, // 確保在每次導航時都檢查 cookie 語系
    //   redirectOn: "root",
    // },
    detectBrowserLanguage: false,
  },
  eslint: {
    checker: true,
  },
  app: {
    head: {
      viewport: "width=500, initial-scale=1",
      title: "adobet88",
      meta: [
        { name: "description", content: "adobet88" },
        { property: "og:title", content: "adobet88" },
        { property: "og:url", content: "http://localhost:3000/" },
        { property: "og:description", content: "adobet88" },
      ],
    },
  },
})