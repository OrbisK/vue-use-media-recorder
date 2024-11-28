import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  rollup: {
    emitCJS: true,
  },
  declaration: true,
  // warnings triggered by nuxt exports not being built - happens in separate script
  failOnWarn: false,
  // TODO: check if all are needed
  externals: [
    '@nuxt/kit',
    '@nuxt/schema',
    'nuxt3',
    'nuxt',
    'vue',
    'defu',
    '@vueuse/motion',
    'csstype',
    '@vueuse/shared',
    'framesync',
    'style-value-types',
    '@vue/compiler-core',
    '@babel/parser',
    '@vue/shared',
    '@vueuse/core',
  ],
  entries: [
    // *.vue -> *.vue
    { builder: 'mkdist', input: './src', pattern: ['**/*.vue'], loaders: ['vue'] },
    { builder: 'mkdist', input: './src', pattern: ['**/*.ts'], format: 'cjs', ext: 'cjs', loaders: ['js'] },
    { builder: 'mkdist', input: './src', pattern: ['**/*.ts'], format: 'esm', ext: 'mjs', loaders: ['js'] },
  ],
})
