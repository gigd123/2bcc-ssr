// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    "vue/html-self-closing": "off", // 禁用自閉合標籤規則
  },
})
