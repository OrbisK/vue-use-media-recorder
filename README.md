# 🪝 vue-use-media-recorder

A Vue Composable for the MediaRecorder API

## Features

- 🎥 Record audio and video streams
- 📦 Auto import for Nuxt
- 🎨 TypeScript support
- 📚 [Documentation](https://orbisk.github.io/vue-use-media-recorder/)

## Installation

```bash
pnpm add -D @orbisk/vue-use-media-recorder
```

### Nuxt

Auto import for Nuxt is supported. Just add the module to your `nuxt.config`:

```ts
export default defineNuxtConfig({
  modules: ['@orbisk/vue-use-media-recorder/nuxt']
})
```

## Commands

Build the package:

```bash
pnpm build
```

Run the development environment (vite):

```bash
pnpm dev
```

Run the docs:

```bash
pnpm dev:docs
```

Build the docs:

```bash
pnpm build:docs
```

Lint the package:

```bash
pnpm lint
```

Run test suite:

```bash
pnpm test
```

Start Nuxt dev environment:

```bash
pnpm dev:nuxt
```

Build Nuxt environment:

```bash
pnpm build:nuxt
```

Preview Nuxt environment:

```bash
pnpm start:nuxt
```
