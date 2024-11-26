/// <reference types="vitest" />
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@orbisk/vue-use-media-recorder',
        replacement: resolve(__dirname, '../../src/index.ts'),
      },
    ],
  },
})
