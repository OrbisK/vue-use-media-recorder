import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  // TODO: check if this is the correct value
  externals: [
    '@orbisk/vue-use-media-recorder',
    '@nuxt/kit',
    '@nuxt/schema',
    'nuxt3',
    'nuxt',
    'vue',
    'defu',
    'csstype',
    '@vueuse/shared',
    'framesync',
    'style-value-types',
    '@vue/compiler-core',
    '@babel/parser',
    '@vue/shared',
    '@vueuse/core',
  ],
})
