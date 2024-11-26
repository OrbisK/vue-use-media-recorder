import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '@orbisk/vue-use-media-recorder',
  description: 'A Vue Composable for MediaRecorder API',
  vite: {
    resolve: {
      alias: [
        {
          find: '@orbisk/vue-use-media-recorder',
          replacement: resolve(__dirname, '../../src/index.ts'),
        },
      ],
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/api-examples' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
})
