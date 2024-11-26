import type { NuxtModule } from '@nuxt/schema'
import { addComponentsDir, addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'

export interface ModuleOptions {}

const DEFAULTS: ModuleOptions = {}

const CONFIG_KEY = 'vue-use-media-recorder'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@orbisk/vue-use-media-recorder',
    configKey: CONFIG_KEY,
  },
  defaults: DEFAULTS,
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Add templates (options and directives)
    addPlugin(resolve('./runtime/templates/plugin'))

    // Add auto imports
    addImportsDir(resolve('./runtime/composables'))

    await addComponentsDir({ path: resolve('../../components') })

    // Transpile necessary packages
    if (!nuxt.options.build.transpile)
      nuxt.options.build.transpile = []
    const transpileList = ['defu', '@orbisk/vue-use-media-recorder', '@vueuse/shared', '@vueuse/core']
    transpileList.forEach((pkgName) => {
      if (!nuxt.options.build.transpile.includes(pkgName))
        nuxt.options.build.transpile.push(pkgName)
    })
  },
}) satisfies NuxtModule
