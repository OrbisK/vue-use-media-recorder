import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  // If you want to keep running your existing tests in Node.js, uncomment the next line.
  // 'vitest.config.ts',
  {
    extends: 'vitest.config.ts',
    test: {
      browser: {
        enabled: true,
        name: 'chromium',
        provider: 'playwright',
        providerOptions: {
          context: {
            permissions: [
              'microphone',
              'camera',
            ],
          },
          launch: {
            args: [
              '--disable-web-security',
              '--use-fake-ui-for-media-stream',
              '--use-fake-device-for-media-stream',
            ],
          },
        },
      },
    },
  },
])
