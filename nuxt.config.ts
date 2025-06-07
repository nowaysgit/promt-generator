// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  
  // Модули
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  
  // Включаем TypeScript строгую проверку
  typescript: {
    strict: true,
    typeCheck: false
  },
  
  // SEO и метаданные
  app: {
    head: {
      title: 'Генератор промтов для анализа кода',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Продвинутый инструмент для создания промтов для анализа архитектуры кода' 
        }
      ],
      htmlAttrs: {
        lang: 'ru'
      }
    }
  },
  
  // CSS фреймворки
  css: ['~/assets/css/main.css'],
  
  // Компоненты автоимпортируются
  components: true
})
