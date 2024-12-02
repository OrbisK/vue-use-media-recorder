import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
  title: 'Vue Use Media Recorder',
  mermaid:{
  },
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
      { text: 'Installation', link: '/installation' },
      { text: 'Composables', link: '/composables' },
      { text: 'Examples', link: '/examples' },
    ],

    sidebar: [
      {
        text: 'Installation',
        link: '/installation',
      },
      {
        text: 'Composables',
        link: '/composables',
      },
      {
        text: 'Components',
        link: '/components',
      },
      {
        text: 'Best Practice',
        link: '/best-practice',
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
}))
