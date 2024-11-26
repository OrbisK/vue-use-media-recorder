import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue Use Media Recorder',
  description: 'A Vue Composable for MediaRecorder API',
  base: '/vue-use-media-recorder/',
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
      { text: 'Installation', link: '/installation' },
      { text: 'Usage', link: '/usage' },
      { text: 'Examples', link: '/examples' },
    ],

    sidebar: [
      {
        text: 'Installation',
        link: '/installation',
      },
      {
        text: 'Usage',
        link: '/usage',
      },
      {
        text: 'Examples',
        link: '/examples',
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/OrbisK/vue-use-media-recorder' },
    ],
  },
})
